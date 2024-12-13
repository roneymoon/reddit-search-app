export default {
    search: function(searchterm, sortBy, limit){
        return fetch(`https://www.reddit.com/search.json?q=${searchterm}?limit=${limit}`)
        .then(res => res.json())
        .then(data => {
            return data.data.children.map(data => data.data)
        })
        .catch(err => console.log(err))
    }
}