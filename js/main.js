//listen for form submit

document.getElementById('myForm').addEventListener('submit', saveBookmark);

function saveBookmark(e){
  //save bookmark
  //get form values
  var siteName = document.getElementById('siteName').value;
  var siteUrl = document.getElementById('siteUrl').value;
if(!validateForm(siteName, siteUrl)){
return false;
}
  var bookmark = {
    name: siteName,
    url: siteUrl
  }
  //local storage test
//   localStorage.setItem('test', 'hello world');
//   console.log(localStorage.getItem('test')); 
//   localStorage.removeItem('test');
// console.log(localStorage.removeItem('test'));
  if(localStorage.getItem('bookmarks')=== null){
      
    //init array
    var bookmarks=[];
    //add bookmark
      bookmarks.push(bookmark);
      //set to localstorage
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  } else {
    //get bookmarks from localstorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //add bookmark to array
    bookmarks.push(bookmark);
    //reset it to localstorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    document.getElementById('myForm').reset();
    //re fetch bookmarks
  fetchBookmarks();
  }

  // console.log(bookmark);
  // console.log(siteName);
  // console.log(siteUrl);

  // console.log('it prints');
  //prevent form submit
  e.preventDefault();
}

//delete book mark
function deleteBookmark(url){
  // console.log(url);
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  //loop thru
  for(var i=0; i < bookmarks.length; i++){
    if(bookmarks[i].url === url){
      bookmarks.splice(i, 1);
    }
  }
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  
//re fetch bookmarks
  fetchBookmarks();
}

//fetch bookmarks
function fetchBookmarks(){
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  // console.log(bookmarks);
  //get output id
  var bookmarksResults = document.getElementById('bookmarksResults');

  bookmarksResults.innerHTML = '';

  for(var i=0; i < bookmarks.length; i++){
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;

    bookmarksResults.innerHTML += 
              '<div class="well" >'+ 
              '<h3>'+name+
              '<a class="btn btn-primary" target="_blank" href="'+url+'">Visit</a>'+
              '<a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a>'
              '</h3>'+
              '</div>'; 

  }

}
function validateForm(siteName, siteUrl){
  if(!siteName || !siteUrl){
    alert('pls fill details');
    return false;
  }

  var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);
  if(!siteUrl.match(regex)){
    alert("use valid")
    return false;
  }
  return true;
}
