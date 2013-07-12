function jsonFlickrApi(rsp) {

	//detect retina
	var retina = window.devicePixelRatio > 1 ? true : false;

	//makes sure everything's ok
	if (rsp.stat != "ok"){
  	return;
 	}
 	
 	//count number of responses
 	var num = rsp.photoset.photo.length;
 	
 	//variables "r" + "s" contain 
 	//markup generated by below loop
 	//r=retina, s=standard
 	var r = "";
 	var s = "";
 	
 	/* repalce 10 with num*/
 	
 	//this loop runs through every item and creates HTML that will display nicely on your page
 	for (var i=0; i < 10; i++) {
  	photo = rsp.photoset.photo[i];

	//create url for retina (o=original, bt=big thumb) and standard (st=standard thumb,
	//so= flickr "large")
  	o_url = 'http://farm'+ photo.farm +'.staticflickr.com/'+ photo.server +'/'+ 
  	photo.id +'_'+ photo.originalsecret +'_o.jpg';
  //	console.log(o_url+"original");
  	bt_url = 'http://farm'+ photo.farm +'.static.flickr.com/'+ photo.server +'/'+ 
  	photo.id +'_'+ photo.secret +'_q.jpg';
  //	console.log(bt_url+"big");
  	st_url = 'http://farm'+ photo.farm +'.static.flickr.com/'+ photo.server +'/'+ 
  	photo.id +'_'+ photo.secret +'_s.jpg';
  	//console.log(st_url+"standard");
  	so_url = 'http://farm'+ photo.farm +'.static.flickr.com/'+ photo.server +'/'+ 
  	photo.id +'_'+ photo.secret +'_b.jpg';
  //	console.log(so_url+"large");
  	r += '<li><a href="'+ bt_url +'" rel="external"><img alt="'+ photo.title +'" src="'+ bt_url +'" title="Click to view '+ photo.title +' full size"/></a></li>';
  	s += '<li><a href="'+ st_url +'" rel="external"><img alt="'+ photo.title +'" src="'+ st_url +'" title="Click to view '+ photo.title +' full size"/></a></li>';
 	}

	//should be self explanatory
	if (retina){
		//alert("hi");
	q = '<div id="MainContent"><ul id="Gallery" class="gallery">'+ r +' </ul></div>'
	}
	else{
	q = '<div id="MainContent"><ul id="Gallery" class="gallery">'+ s +' </ul></div>'
	}

 	//this tells the JavaScript to write everything in variable s onto the page
 	document.writeln(q); 
}