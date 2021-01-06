var app = new Vue({
  el: "#container",
  data: {
    movie: "",
    prefix: "https://image.tmdb.org/t/p/w220_and_h330_face/",
    imageNotFound: "https://www.nfscars.net/static/img/not-found.png",
    movieArray: [],
    seriesArray: [],
    movieSeriesArray: [],
    movieVoteArray: [],
    seriesVoteArray: [],

  },
  methods: {
    searchMovie: function() {
      var self = this;
      axios
        .get('https://api.themoviedb.org/3/search/movie', {
          params: {
            api_key: 'edd16151e233ee23b651827098996afe',
            query: self.movie
          }
        })
        .then( function(response) {
          self.movieArray = response.data.results;

          for (var i = 0; i < self.movieArray.length; i++) {
            let movieVote = Math.ceil(self.movieArray[i].vote_average/2);
            self.movieVoteArray.push(movieVote);
          }
        })
    },
    searchSeries: function() {
      var self = this;
      axios
        .get('https://api.themoviedb.org/3/search/tv', {
          params: {
            api_key: 'edd16151e233ee23b651827098996afe',
            query: self.movie
          }
        })
        .then( function(response) {
          self.seriesArray = response.data.results;
          self.movieSeriesArray = self.seriesArray.concat(self.movieArray);

          for (var i = 0; i < self.movieSeriesArray.length; i++) {
            let seriesVote = Math.ceil(self.movieSeriesArray[i].vote_average/2);
            self.seriesVoteArray.push(seriesVote);
          }
        })
    },
    allSearch: function() {
      this.searchMovie();
      this.searchSeries();
    },
  }
});
