
// first we have to declare the module. note that [] is where we will declare the dependecies later. Right now we are leaving it blank
var myApp = angular.module('blogApp', ['ngRoute']); 


// this is without $scope
myApp.controller('mainController',['$http',function($http) {

  //create a context
  var main = this;


  this.pageHeading = 'edWisor Blog';
  this.pageSubHeading = 'A collection of experience by students, alumni and edWisor.com team'
  
  // i knew the result is going to be array, so i declared an empty array to initialize
  this.blogs = [];
  console.log(this.blogs);

  this.baseUrl = '//ec2-52-77-247-196.ap-southeast-1.compute.amazonaws.com:3000/api/blogs';



  this.loadAllBlogs = function(){
   
      $http({
        method: 'GET',
        url: main.baseUrl+'/all'
      }).then(function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
          console.log(response);
          main.blogs = response.data.data;
          console.log(main.blogs);

        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          alert("some error occurred. Check the console.");
          console.log(response);

        });


  }// end load all blogs

  this.loadAllBlogs();

  this.delete = function(blogID){
    $http({
      method: 'POST',
      url : main.baseUrl+'/'+blogID+'/remove'
    }).then(function successCallback(response){
      alert('Blog deleted successfully');
      location.reload();
      console.log("deleted");

    }, function errorCallback(response){
      alert("some error occurred. Check the console");
         console.log(response);
    });
  }


   


}]); // end controller





myApp.controller('singleBlogController',['$http','$routeParams',function($http,$routeParams) {

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

  console.log(this.blogId);


  this.baseUrl = '//ec2-52-77-247-196.ap-southeast-1.compute.amazonaws.com:3000/api/blogs';

  this.delete =function(){

    $http({method : "POST" , 
      url : main.baseUrl+'/'+main.blogId+'/remove'
    }).then(function successCallback(response){
      alert("deleted successfully");
      window.location = 'index.html#/';
      console.log(response);
    }, function errorCallback(response){ 
      console.log(response)});

  }


  
  this.loadSingeBlog = function(){
   
      $http({
        method: 'GET',
        url: main.baseUrl+'/'+main.blogId
      }).then(function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
          //console.log(response);
          main.blog = response.data.data;
          console.log(main.blog);

          main.pageHeading = main.blog.heading;
          main.pageSubHeading = main.blog.subHeading;
          

        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          alert("some error occurred. Check the console.");
          console.log(response);
        });


  }// end load all blogs

  
   


}]); // end controller



myApp.controller('blogCreateController',['$http',function($http) {

  //create a context
  var main = this;


  this.pageHeading = 'Create a blog post';
  this.pageSubHeading = 'please fill all the data'
 

  this.baseUrl = '//ec2-52-77-247-196.ap-southeast-1.compute.amazonaws.com:3000/api/blogs';

  this.createPost = function(){

      var myData = {

          heading     : main.heading,
          subHeading  : main.subHeading,
          bodyHtml    : main.bodyHtml,
          author      : main.author


      }

      console.log(myData);
   
      $http({

        method: 'POST',
        data  : myData,
        url: main.baseUrl+'/create'
        
      }).then(function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
          //console.log(response);
          alert("blog created ");
          window.location = 'index.html#/blog/'+response.data.data.blogId;
          

        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          alert("some error occurred. Check the console.");
          console.log(response);
        });


  }// end load all blogs
   


}]); // end controller

myApp.controller('editableController',['$http','$routeParams',function($http,$routeParams) {

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


  this.baseUrl = '//ec2-52-77-247-196.ap-southeast-1.compute.amazonaws.com:3000/api/blogs';

  this.loadSingeBlog = function(){


   
      $http({
        method: 'GET',
        url: main.baseUrl+'/'+main.blogId
      }).then(function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
          //console.log(response);
          main.blog = response.data.data;
          console.log(main.blog);
          console.log("got it")
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

  this.editPost = function(){

     var myData ={

          heading     : main.heading,
          subHeading  : main.subHeading,
          bodyHtml    : main.bodyHtml,
          author      : main.author


      }

    $http({method : "PUT",
      data : myData,
      url : main.baseUrl+'/'+main.blogId+'/edit'
    }).then(function successCallback(response){
      alert("updated successfully");
      window.location = 'index.html#/blog/'+response.data.data.blogId;
      console.log(response);
      //window.location = 'post.html?blogId='+response.data.data.blogId;
    } , function errorCallback(response){
      alert("error");
      console.log(response);
    });
  }

 

  }// end load all blogs

   


}]); // end controller
