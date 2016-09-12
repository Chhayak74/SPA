myApp.controller('editableController',['$http','$routeParams', '$location','BlogService' , function($http,$routeParams,$location,BlogService ) {

  //create a context
  var main = this;


  this.pageHeading = 'Edit your blog here';
  this.pageSubHeading = 'Update the below form'
 

  /*this.getParameterByName = function(name){

      name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
      var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
      results = regex.exec(location.search);
      return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));


  }*/// end get parameter by name

  this.blogId = $routeParams.blogId;
  console.log(this.blogId);


  this.baseUrl = 'https://blog.theguywithideas.com/api/blogs';

  this.loadSingleBlog = function(){


      BlogService.getSingleBlog(main.blogId)
      .then(function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
          //console.log(response);
          main.blog = response.data.data;
          console.log(main.blog+"ksksksksksk");
          main.heading = main.blog.heading;
          main.subHeading = main.blog.subHeading;
          main.bodyHtml = main.blog.bodyHtml;
          main.author = main.blog.author;

        
        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          alert("some error occurred. Check the console.");
          console.log(response);
        });
  }//end get single blog


  this.editPost = function(){

     var myData ={

          heading     : main.heading,
          subHeading  : main.subHeading,
          bodyHtml    : main.bodyHtml,
          author      : main.author


      }

      

    BlogService.editABlog(main.blogId , myData)
    .then(function successCallback(response){
      alert("updated successfully");
      //window.location = 'index.html#/blog/'+response.data.data.blogId;
      console.log(response);
      $location.path('/blog/'+response.data.data.blogId);
    } , function errorCallback(response){
      alert("error");
      console.log(response);
    });
  }

 

  

   


}]); // end controller
