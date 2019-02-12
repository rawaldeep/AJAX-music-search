const getYoutube = (artistId, artistName) => {
    let list = document.querySelector('.results');
    list.innerHTML = '';
    document.querySelector(`.search`).value = '';
    let artistTitle = document.querySelector('.artist');
    artistTitle.innerHTML = artistName;
    const url = `https://musicdemons.com/api/v1/artist/${artistId}/songs`;
    let youtubeId = [];
     fetch(url)
    .then(function(response) {return response.json()})
    .then(function(myJson) {
        for(let i in myJson){
            youtubeId.push(myJson[i].youtube_id);
        }
    let videos = document.querySelector('.songs');
    if(videos.getElementsByTagName('li').length >= 1){
        videos.innerHTML = "";
        }
    youtubeId.forEach(element => {
        li = document.createElement("li");
        video = document.createElement("iframe");
        video.setAttribute('class' , 'videos');
        video.setAttribute('src' , `https://www.youtube.com/embed/${element}`);
        video.setAttribute('frameborder' , `0`);
        video.setAttribute('picture-in-picture', true);
        video.setAttribute('allow', 'accelerometer');
        video.setAttribute('encrypted-media', true);
        video.setAttribute('gyroscope', true);
        video.setAttribute('allowfullscreen', true);
        li.appendChild(video);
        videos.appendChild(li); 
    });
    // console.log(youtubeId)

    });
    
}
    
    const createResultList = (results) => {
        // let list1 = document.querySelector('.artist');
        let list = document.querySelector('.results');
        let li;
        const handleKeyDownSearch = (y) =>{
            if(!document.querySelector(`.search`).value){
            if(y.getElementsByTagName('li').length >= 1){
            y.innerHTML = "";
            // x.innerHTML = '';
            }
        }
        }
        // list1.innerHTML = '';
        list.innerHTML = '';
        for(let i in results){
            
            li = document.createElement("li");
            li.appendChild(document.createTextNode(`${results[i].name}`));
            li.setAttribute("id", results[i].id); // added line
            li.setAttribute('onclick',`getYoutube(${results[i].id}, '${results[i].name}')`);
            list.appendChild(li); 
        
       }
       document.querySelector(`.search`).addEventListener(`keydown`, handleKeyDownSearch(list));
     
    }

    const search = value => {

        const url = `https://musicdemons.com/api/v1/artist/autocomplete`;
        const options = {
            method: 'POST',
            headers: {
            'Content-type': 'application/x-www-form-urlencoded'
            },
            body: `name=${value}`
            };
         fetch(url,options)
        .then(function(response) {return response.json()})
        .then(function(myJson) {
            createResultList(myJson);
        });

    };

    const handleKeyUpSearch = e => {
        const $input = e.currentTarget;
        search($input.value);

    };

    const init = () => {
        document.querySelector(`.search`).addEventListener(`keyup`, handleKeyUpSearch);
    };

    init();
