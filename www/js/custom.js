		
		$(document).ready(function()   {
		
	var locations = [
					  ['<div class="mapdiv">Ministry of Culture, Youth &amp;<br />Community Development<br />Abu Dhabi Office<br />Phone: 024466145<br />Fax: 024452504<br />PO Box: 17 Abu Dhabi<br /><br /><a href="#" onclick="document.getElementById(\'locate\').className =\'abudhabi\'">Show the map</a></div>', 24.47, 54.38, 1],
					  ['<div class="mapdiv">Ministry of Culture, Youth &amp;<br />Community Development<br />Dubai Office<br />Phone: 042617744<br />Fax: 042612670<br />PO Box: 97721 Dubai<br /><br /><a href="#" onclick="document.getElementById(\'locate\').className =\'dubai\'">Show the map</a></div>', 25.2697, 55.3095, 2],
					  ['<div class="mapdiv">Ministry of Culture, Youth &amp;<br />Community Development<br />Abu Dhabi Cultural Center<br />Phone: 024456969<br />Fax: 024467330<br />PO Box: 17 Abu Dhabi<br /><br /><a href="#" onclick="document.getElementById(\'locate\').className =\'abudhabicc\'">Show the map</a></div>', 24.42, 54.47, 3],
					  ['<div class="mapdiv">Ministry of Culture, Youth &amp;<br />Community Development<br />Ras Al-Khaimah Cultural Center<br />Phone: 072276666<br />Fax: 07224114<br />PO Box: 36665 Ras Al-Khaimah<br /><br /><a href="#" onclick="document.getElementById(\'locate\').className =\'rasalkehma\'">Show the map</a></div>', 25.8, 55.97, 4],
					  ['<div class="mapdiv">Ministry of Culture, Youth &amp;<br />Community Development<br />Western Area Cultural Center<br />Phone: 028846983<br />Fax: 027511655<br />PO Box: 1217 Abu Dhabi<br /><br /><a href="#" onclick="document.getElementById(\'locate\').className =\'abudhabiwes\'">Show the map</a></div>', 24.38, 54.55, 5],
					  ['<div class="mapdiv">Ministry of Culture, Youth &amp;<br />Community Development<br />Fujairah Cultural Center<br />Phone: 092232878<br />Fax: 092227535<br />PO Box: 110 Fujairah<br /><br /><a href="#" onclick="document.getElementById(\'locate\').className =\'fujera\'">Show the map</a></div>', 25.12, 56.35, 6],
					  ['<div class="mapdiv">Ministry of Culture, Youth &amp;<br />Community Development<br />Dabba Al Fujairah Cultural Center<br />Phone: 0922441923<br />Fax: 092441824<br />PO Box: 110 Fujairah<br /><br /><a href="#" onclick="document.getElementById(\'locate\').className =\'daba\'">Show the map</a></div>', 25.10, 56.23, 7],
					  ['<div class="mapdiv">Ministry of Culture, Youth &amp;<br />Community Development<br />Masafi Cultural Center<br />Phone: 0922563141<br />Fax: 092563142<br />PO Box: 110 Fujairah<br /><br /><a href="#" onclick="document.getElementById(\'locate\').className =\'masafi\'">Show the map</a></div>', 25.19, 56.28, 8],
					  ['<div class="mapdiv">Ministry of Culture, Youth &amp;<br />Community Development<br />Umm Al Quwain Cultural Center<br />Phone: 067672100<br />Fax: 024452504<br />PO Box: 414 Umm Al Quwain<br /><br /><a href="#" onclick="document.getElementById(\'locate\').className =\'umm\'">Show the map</a></div>', 25.515, 55.578, 9],
					  ['<div class="mapdiv">Ministry of Culture, Youth &amp;<br />Community Development<br />Sharjah Music Center<br />Phone: 066755577<br />Fax: 065380188<br /><br /><a href="#" onclick="document.getElementById(\'locate\').className =\'sharjah\'">Show the map</a></div>', 25.35, 55.4, 10]
					];
			
			
			 
	var map = new google.maps.Map(document.getElementById('map_canvas'), {
		  zoom: 8,
		  center: new google.maps.LatLng(24.47, 54.38),
		  mapTypeId: google.maps.MapTypeId.ROADMAP
		});

		

		var marker = null, i, addId, location_lat, location_lng;
		var infowindow = new google.maps.InfoWindow();
		
		function googleMarker( lat, lng){
			
			if(marker != null){
				marker.setMap(null);
				infowindow.close();
			} 
			
			location_lat = lat, location_lng=lng;
			
			//for (i = 0; i < locations.length; i++) {  
				  marker = new google.maps.Marker({
					position: new google.maps.LatLng(lat, lng),
					map: map
				  });
				  
				  google.maps.event.addListener(marker, 'click', (function(marker, i) {
					return function() {
					  infowindow.setContent(locations[addId][0]);
					  infowindow.open(map, marker);
					  //infowindow.close();
					}
				  })(marker, i));
				  
			}
		
			$('#locateUsPage').on('pageshow', function() {
				google.maps.event.trigger(map, 'resize');
				map.panTo(new google.maps.LatLng(location_lat,location_lng));
				
			});
			
					$("#addresslist").on('click', 'li a', function(e){
						var id = $(this).closest('li').attr('id');
						id = parseInt( id.split("_")[1]);
						addId = id;
						googleMarker(locations[id][1], locations[id][2]);
						
						$.mobile.changePage("#locateUsPage");
						//e.stopPropagation();
					});
				
	
		$('#txtCatalogueSearch').on('keypress', function(e)   {
			var code = (e.keyCode ? e.keyCode : e.which);
			 if(code == 13) { //Enter keycode
			 var query = $(this).val();			
			if($.trim(query) == ""){
				alert("Please enter search keyword");
				return;
			}
			
			//$("#keyword").blur();
			
			   getCatalogueSearchResults(query);
			 }	
			 
		});
		
		
		
		
		function getCatalogueSearchResults(query)
		{
		if(checkConnection())
		{
			$.mobile.loading('show');
		var url =  "http://encl.ae:8000/json.php";
			$.getJSON(url + "?q=" + query + "&callback=?", function(data) {
				
				var html="";
				  $.each(data.channel.item, function(index, resultObj) {
					
									   
					html+='<li data-iconpos="right" data-icon="arrow-r"><a data-link="'+ resultObj.link +'" >'+
							'<h3 class="ui-li-heading">'+ resultObj.title +' </h3>'+
							'<p class="ui-li-desc">Published in  '+  new Date(resultObj.pubDate).getFullYear() +'</p>'+
							'<p class="ui-li-desc">Format:  ' +  resultObj.format +'</p>'+
							'<p class="check ui-li-desc" style="float: right; margin-right: 10px">Check Availability</p></a></li>';
					
					});
					
					if(html == "")
					html = '<li> No results found </li>';
					
									$('#catalogue_search_list').html(html).listview('refresh');
									
									$.mobile.loading('hide');
								}).error(function(err){
									$.mobile.loading('hide');
									console.log("error", err);
			});
			
		}
}		
		$('#catalogue_search_list').on('click','li',function(e) {
		var link =$(this).find('a').attr('data-link');
		
			if(link && checkConnection()){
				 window.open(link, '_blank', 'location=yes');
			}
		});
		
		$('#myAccount_icon').on('click',function()   {
		if(checkConnection())
			window.open('http://encl.ae:8000/MyResearch/Home?ui=mobile', '_blank', 'location=yes');
		});
		
		$('#oneSearch_icon').on('click',function()   {
			if(checkConnection())
		window.open('http://m.mcycd.nexuslib.com/', '_blank', 'location=yes');
			
		});
		
		$('#btnFacebook').on('click',function()   {
			navigator.app.loadUrl('https://www.facebook.com/Mcycd1', {openExternal:true});
		});
		$('#btnTwitter').on('click',function()   {
			navigator.app.loadUrl('https://www.twitter.com/mcycd', {openExternal:true});
			
		});
		$('#btnYoutube').on('click',function()   {
			navigator.app.loadUrl('http://www.youtube.com/themcycd', {openExternal:true});
		});
		
		$('#btnSurveySubmit').on('click',function()   {
		if(checkConnection())
		{
			$.post("http://mcycd.nexuslib.com/service/index.php/feedback",function(data,status){
			alert( data);
			
		});
		}	
		});
		
		$('#btnFeedbackSubmit').on('click',function()   {
		if(checkConnection())
		{
			$.post("http://mcycd.nexuslib.com/service/index.php/feedback",function(data,status){
			alert( data);
	 		});
		}
	});
		
		$('#btnadvisoryFormSubmit').on('click',function()   {
		if(checkConnection())
		{
			$.post("http://mcycd.nexuslib.com/service/index.php/advisory_visit",function(data,status){
			alert( data);
			
			});
		}
		});
		
		$('#btnTourFormSubmit').on('click',function()   {
		if(checkConnection())
		{
			$.post("http://mcycd.nexuslib.com/service/index.php/library_tour",function(data,status){
			alert( data);
		
			});
		}
		});
		
		$('#btn_photo_gallery').on('click',function()   {

		if(checkConnection())
		$.mobile.changePage('#photogallery');
		});
		
		 function checkConnection() {
        var networkState = navigator.connection.type;

        var states = {};
			states[Connection.UNKNOWN]  = 'Unknown connection';
			states[Connection.ETHERNET] = 'Ethernet connection';
			states[Connection.WIFI]     = 'WiFi connection';
			states[Connection.CELL_2G]  = 'Cell 2G connection';
			states[Connection.CELL_3G]  = 'Cell 3G connection';
			states[Connection.CELL_4G]  = 'Cell 4G connection';
			states[Connection.CELL]     = 'Cell generic connection';
			states[Connection.NONE]     = 'No network connection';
			
      
       
	   if( states[networkState] == states[Connection.NONE])
	   {
	   
	   showAlert('No internet connection','Alert','OK');
	   $.mobile.loading('hide');
	 
	   return false;
	   }
	 return true;
    }
	
	function showAlert(message,title,buttonText) {
        navigator.notification.alert(
            message,  // message
            function() {},         // callback
            title,            // title
           buttonText                 // buttonName
        );
    }	
		
 });			
	

		