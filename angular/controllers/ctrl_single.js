//controller to get a single blog

myApp.controller('singleBlogController',['$http','$routeParams','$location','BlogService',function($http,$routeParams,$location,BlogService) {

  //create a context
  var main = this;


  this.pageHeading = '';
  this.pageSubHeading = ''
 

  /*this.getParameterByName = function(name){

      name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
      var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
      results = regex.exec(location.search);
      return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));


  }// end get parameter by name*/

  this.blogId = $routeParams.blogId;
  this.allBlogs = [];

  console.log(this.blogId);

  BlogService.getAllBlogs()
  .then(function successCallback(response){
       
       main.allBlogs = response.data.data;

  }, function errorCallback(response){
    alert('Some error occured . Check the console.')
    console.log(response)
  });


  this.baseUrl = 'https://blog.theguywithideas.com/api/blogs';

  this.delete =function(index){

   BlogService.deleteBlog(main.blogId)
   .then(function successCallback(response){
      alert("deleted successfully");
      //window.location = 'index.html#/';
      main.allBlogs.splice(index , 1);
      $location.path('/')
      console.log(response);
    }, function errorCallback(response){ 
      console.log(response)});

  }


  
  this.loadSingleBlog = function(){
   
      BlogService.getSingleBlog(main.blogId)
      .then(function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
          //var ans = JSON.stringify(response)
          //console.log(ans+"reponseeessss");
          main.blog = response.data.data;
          console.log(main.blog+"reponseee"+response);

          main.pageHeading = main.blog.heading;
          main.pageSubHeading = main.blog.subHeading;
          

        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          alert("some error occurred. Check the console.");
          console.log(response);
        });


  }// end load single blog

  
   


}]); // end controller
