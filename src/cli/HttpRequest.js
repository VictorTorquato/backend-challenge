var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;


module.exports = {

    listCoutries(){
        let xhr = new XMLHttpRequest();
        xhr.open('GET', ("http://localhost:3333/countries"), true);
        xhr.send();

        xhr.onreadystatechange = processRequest;

        function processRequest(e) {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var response = xhr.responseText;
                console.log(response);
            }
        };
    },

    createCountry(name, url){
        let xhr = new XMLHttpRequest();
        var params = {
            name:name,
            url: url
        };
        xhr.open('POST', ("http://localhost:3333/countries"), true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.send(JSON.stringify(params));

        xhr.onreadystatechange = processRequest;

        function processRequest(e) {
            if (xhr.readyState == 4 && xhr.status == 201) {
                let response = xhr.responseText;
                console.log(response);
            }
        }
    },

    deleteCountry(id){
        let xhr = new XMLHttpRequest();
        xhr.open('DELETE', ("http://localhost:3333/countries/"+id), true);
        xhr.send();

        xhr.onreadystatechange = processRequest;

        function processRequest(e) {
            if (xhr.readyState == 4 && xhr.status == 204) {
                let response = xhr.responseText;
                console.log(response);
            }
            if (xhr.readyState == 4 && xhr.status == 400) {
                let response = xhr.responseText;
                console.log(response);
            }
        }
    },

    listPlaces(){
        let xhr = new XMLHttpRequest();
        xhr.open('GET', ("http://localhost:3333/places"), true);
        xhr.send();

        xhr.onreadystatechange = processRequest;

        function processRequest(e) {
            if (xhr.readyState == 4 && xhr.status == 200) {
                let response = xhr.responseText;
                console.log(response);
            }
        }
    },

    existPlace(name, countryId)
    {
        let xhr = new XMLHttpRequest();
        var params = {
            name: name,
            countryId: countryId
        };

        xhr.open('GET', ("http://localhost:3333/places/exist"), true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.send(JSON.stringify(params));

        xhr.onreadystatechange = processRequest;
        
        function processRequest(e) {
            if (xhr.readyState == 4 && xhr.status == 200) {
                return(1);
            }
            if (xhr.readyState == 4 && xhr.status == 400) {
                return(0);
            }
        };
    },

    createPlace(name, data, countryID){
        let xhr = new XMLHttpRequest();
        var params = {
        name: name,
        data: data,
        countryId: countryID };

        xhr.open('POST', ("http://localhost:3333/places"), true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.send(JSON.stringify(params));
        
        xhr.onreadystatechange = processRequest;

        function processRequest(e) {
            if (xhr.readyState == 4 && xhr.status == 201) {
                let response = xhr.responseText;
                console.log(response);
            }
            if (xhr.readyState == 4 && xhr.status == 400) {
                let response = xhr.responseText;
                console.log(response);
            }
        }
    },

    updatePlace(id, newName, newData){
        let xhr = new XMLHttpRequest();

        var params = {
            id: id,
            newName: newName,
            newData: newData
        };
        
        xhr.open('PUT', ("http://localhost:3333/places"), true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.send(JSON.stringify(params));

        xhr.onreadystatechange = processRequest;

        function processRequest(e) {
            if (xhr.readyState == 4 && xhr.status == 204) {
                let response = xhr.responseText;
                console.log(response);
            }
            if (xhr.readyState == 4 && xhr.status == 400) {
                let response = xhr.responseText;
                console.log(response);
            }
        }
    },

    deletePlace(id){
        let xhr = new XMLHttpRequest();
        xhr.open('DELETE', ("http://localhost:3333/places/"+id), true);
        xhr.send();

        xhr.onreadystatechange = processRequest;

        function processRequest(e) {
            if (xhr.readyState == 4 && xhr.status == 204) {
                let response = xhr.responseText;
                console.log(response);
            }
            if (xhr.readyState == 4 && xhr.status == 400) {
                let response = xhr.responseText;
                console.log(response);
            }
        }
    },
}
