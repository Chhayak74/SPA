myApp.controller('blogCreateController',['$http','$location','BlogService',function($http, $location, BlogService) {

  //create a context
  var main = this;


  this.pageHeading = 'Create a blog post';
  this.pageSubHeading = 'please fill all the data'
 

  this.baseUrl = 'https://blog.theguywithideas.com/api/blogs';

  this.createPost = function(){

      var myData = {

          heading     : main.heading,
          subHeading  : main.subHeading,
          bodyHtml    : main.bodyHtml,
          author      : main.author


      }

      console.log(myData);
   
      BlogService.createABlog(myData)
      .then(function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
          //console.log(response);
          alert("blog created ");
          //window.location = 'index.html#/blog/'+response.data.data.blogId;
          $location.path('/blog/'+response.data.data.blogId);

        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          alert("some error occurred. Check the console.");
          console.log(response);
        });


  }// end load all blogs
   


}]); // end controller
