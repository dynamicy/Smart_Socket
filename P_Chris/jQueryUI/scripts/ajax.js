// ajax.js
var xmlHttp = null;
var objs = null;
var s=null;
var str=null;
function yanaly()
{
  var objs = document.getElementById("yurl").value;
  s =1;
  document.getElementById("yurl").value = "";
	sendRequest(objs,"ydiv");
	
//	document.getElementById("httpResult").innerHTML = result;
}

function yamanaly()
{
  var objs = document.getElementById("testurl").value;
  s =2;
  document.getElementById("testurl").value = "";
	sendRequest(objs,"testdiv");
	
//	document.getElementById("httpResult").innerHTML = result;
}

function createXMLHttpRequest()
{
	try 
	{ 
		return new ActiveXObject("Msxml2.XMLHTTP"); 
	} catch (e) {}
	try { return new ActiveXObject("Microsoft.XMLHTTP"); } catch (e) {}
	try { return new XMLHttpRequest(); } catch(e) {}
	alert("XMLHttpRequest not supported");
	return null;

}

function sendRequest(str,obj_name)
{
	var xmlHttp = createXMLHttpRequest();
	if (xmlHttp)
	{	 
		// msg from obj
	 	var url = "socket_client.php?msg=" + str;

		xmlHttp.open("GET",url );
		
		xmlHttp.onreadystatechange = function()
		{
			if(xmlHttp.readyState == 4 && xmlHttp.status == 200)
			{
    			var rsp_text = xmlHttp.responseText;
	    	    var obj = document.getElementById(obj_name);
				obj.innerHTML = rsp_text;
	    		/*
	    		var objhtml = null;
	    	    var objDiv = document.getElementById(str);
	    	    var objid = xmlHttp.responseText.split(" ");
	    	    //alert("Size:"+objid.length);
	    	    objDiv.innerHTML="";
	    	    //alert(objid.length);
	    	    for(var i=0;i<objid.length-1;i++)¡@
						{¡@
							var objresult = document.getElementById(objid[i]);
							objDiv.innerHTML+=objresult.outerHTML;¡@
					  }¡@
						
	    	    //var objresult = document.getElementById(xmlHttp.responseText);
	         	//objDiv.innerHTML = xmlHttp.responseText;
	         	//objDiv.innerHTML=objhtml;
	         	document.getElementById("maindiv").style.display = "none";
	         	*/
         	}
	  		else
	  		{
	  				;
	  				/*
	  			  document.getElementById("maindiv").style.display = "none";
	  		    var objDiv = document.getElementById(str);
	          objDiv.innerHTML = "<img src=loading.gif>";       
	          */
	   		}
		}

    xmlHttp.send(null);
	}
}