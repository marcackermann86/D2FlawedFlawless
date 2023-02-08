const bungie_api_key = '447951a1ae554b0c96459d428f51b106';
const local_api_key= 'e494bfd5e6144ca0b7d5b3b2bf13b551';
const bungie_client_id = '42526';
const local_client_id = '42437';
const bungie_base_URL = 'https://www.bungie.net/';
const stats_base_URL = 'https://stats.bungie.net/';
const parametersGET = {
    method: 'GET',
    headers: {
      'x-api-key' : bungie_api_key
    }
  };

async function callAPI(URL, parameters) {
    const response = await fetch(URL, parameters).catch((err) => console.log(err));
    const data = await response.json();

    return data;    
};

export async function searchForCharacter(searchStr, mode, selectedActivity) {
    let search_URL = 'Platform/Destiny2/SearchDestinyPlayer/-1/';
    let username = searchStr.replace("#", "%23");
    let search_full_URL = bungie_base_URL + search_URL + username;

    //console.log("search_full_URL");
    //console.log(search_full_URL);

    let data = await callAPI(search_full_URL, parametersGET);
    //console.log("searchForCharacter");
    //console.log(data);

    if(data.Message.includes('maintenance'))
      alert("Bungie took down the API. Sad panda.");
    else {
        //console.log("searchForCharacter");
        //console.log(data);


        return await getCharacters(data, mode, selectedActivity);
      
        //return await data;
    }
};

async function getProfile(membership_id, membership_type) {
    let profile_URL = 'Platform/Destiny2/' + membership_type + '/Profile/';
    let full_profile_URL = bungie_base_URL + profile_URL + membership_id + '/?' + new URLSearchParams({'components' : 'Profiles,Characters,Records'});

    const data = await callAPI(full_profile_URL,parametersGET);
    
    return data;
};

async function getActivities(membership_id, membership_type, characteer_id, mode, selectedActivity) {
    let i = 0;
    let activites_URL = bungie_base_URL + 'Platform/Destiny2/' + membership_type + '/Account/' + membership_id + '/Character/' + characteer_id + '/Stats/Activities/?page=' + i + '&mode=' + mode + '&count=250';
    let morePages = true;
    let data = [];
    let response = '';
    let activityIDs = [];

    while(morePages) {
      response = await callAPI(activites_URL, parametersGET);

      if (response.Response.activities.length < 250)
        morePages = false;
      
      data = data.concat(response.Response.activities);
      i++;
      activites_URL = bungie_base_URL + 'Platform/Destiny2/' + membership_type + '/Account/' + membership_id + '/Character/' + characteer_id + '/Stats/Activities/?page=' + i + '&mode=' + mode + '&count=250';
    }

    for(let j = 0; j < data.length; j++)
      if (data[j].activityDetails.referenceId == selectedActivity)
        activityIDs.push([data[j].activityDetails.referenceId,data[j].activityDetails.instanceId,data[j].values.completed.basic.displayValue]);

    return activityIDs;
};

async function getActivityPostGame(activityID) {
    let postgame_URL = 'Platform/Destiny2/Stats/PostGameCarnageReport/';
    let full_URL = stats_base_URL + postgame_URL + activityID + '/';

    const data = await callAPI(full_URL, parametersGET);
    
    return data;
};

async function getCharacters(data, mode, selectedActivity) {
    let membership_id = data.Response[0].membershipId;
    let membership_type = data.Response[0].membershipType;
    let displayName = data.Response[0].bungieGlobalDisplayName;
    let displayNameCode = data.Response[0].bungieGlobalDisplayNameCode;
    let displayName_full = displayName + '#' + displayNameCode;
    let profile_data = await getProfile(membership_id, membership_type);
    //console.log("getProfile data");
    //console.log(profile_data);
    let characters = Object.keys(profile_data.Response.characters.data);
    let emblemPath = [];
    let lightLevel = [];
    let classType = [];
    let classTypeString = [];
    let raidData = [];
    let allRaidData = [];
    let totalClears = 0;
    let finalResults = [];
    let ruinedFlawlesses = [];

    for (let i = 0; i < characters.length; i++) {
        emblemPath.push(profile_data.Response.characters.data[characters[i]].emblemBackgroundPath);
        lightLevel.push(profile_data.Response.characters.data[characters[i]].light);
        classType.push(profile_data.Response.characters.data[characters[i]].classType);
  
        if(classType[i] === 0)
          classTypeString.push('Titan');
        else if (classType[i] === 1)
          classTypeString.push('Hunter');
        else if (classType[i] === 2)
          classTypeString.push('Warlock');
        else
          console.log("Error : classType :: could not resolve class type from number. ClassType = " + classType);
  
        raidData = await getActivities(membership_id, membership_type, characters[i], mode, selectedActivity);

        //console.log("raidData");
        //console.log(raidData);
        //allRaidData = allRaidData.concat(raidData);

        let data = await getFlawedFlawless(raidData, selectedActivity);
        finalResults.push(data);
      }

      //console.log('finalResults');
      //console.log(finalResults);
      finalResults = finalResults.filter((ele) => ele.length > 0);
      return finalResults;
}


async function getFlawedFlawless(data) {
    let clearsPerCharacter = 0;
    let allCompletedData = [];
    let ruinedFlawlesses = [];
    let activityData = data;
    let totalClears = 0;
    let flawedFlawless = [];
    
    for(let j = 0; j < activityData.length; j++) {
      if(activityData[j][2] == 'Yes') {
        totalClears++;
        clearsPerCharacter++;
        let postGameData = await getActivityPostGame(activityData[j][[1]]);
        let extractedData = [];
        let activityId = postGameData.Response.activityDetails.referenceId;
        let activityTime = postGameData.Response.period;


  
        if(postGameData.Response.activityWasStartedFromBeginning || (activityData[j][0] === 4078656646)){
          let raidDeaths = 0;
          let flawless = true;
          let firstDeath = '';
          let deathsByFirstDeath = 0;
  
          for (let k = 0; k < (postGameData.Response.entries).length; k++){
            let characterName = postGameData.Response.entries[k].player.destinyUserInfo.bungieGlobalDisplayName;
            let characterDeaths = postGameData.Response.entries[k].values.deaths.basic.value;
            let data = {
              name: characterName,
              deaths: characterDeaths
            };
            
            if (characterDeaths > 0 && raidDeaths === 0){
              firstDeath = characterName;
              deathsByFirstDeath = characterDeaths;
            }
  
            raidDeaths += characterDeaths;
            
            extractedData.push(data);
          }
          allCompletedData = allCompletedData.concat(postGameData);
          
          if (raidDeaths === 0)
            flawless = true;
          else if(raidDeaths > 0)
            flawless = false;
          else
            console.log("Error: Negative deaths - " + raidDeaths);
          
          if (deathsByFirstDeath === raidDeaths && !flawless){
            
            //console.log("activityID = " + activityId);
            //console.log("raidDeaths = " + raidDeaths);
           //console.log("ruinedBy = " + firstDeath);
            let data = {
              id: activityId,
              time: activityTime,
              characters: extractedData
            };
            
  
            ruinedFlawlesses = ruinedFlawlesses.concat([[activityData[j][[1]],raidDeaths,firstDeath]]);
            //console.log("flawedFlawless")
            //console.log(data)
            flawedFlawless.push(data);
          }
        }
      }
    }
    //console.log('flawedFlawless');
    //console.log(flawedFlawless);
    return(flawedFlawless);
  }