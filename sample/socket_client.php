<?php
		$service_port = 5678;
		$address = '127.0.0.1';
		$socket = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);
    
		//echo "Attempting to connect to '$address' on port '$service_port'...\n";
		$result = socket_connect($socket, $address, $service_port);
		if ($result === false) {
    		die("Server didn't open\n");
		} 
		/*else {
    		echo ("OK.\n");
		}*/
    $msg = $_GET["msg"];
		$in = "HEAD / HTTP/1.1\r\n";
		$in .= "Host: www.example.com\r\n";
		$in .= "Connection: Close\r\n\r\n";
		$out = '';

		//echo "Msg:".$msg."\n";

		socket_write($socket, $msg, strlen($msg));
		$buf = 'This is my buffer.';
		//while($rec=="")
		$rec=socket_read($socket,10);
		//echo ("Receiving Msg:</br>".$rec."\n");
		echo $rec;
		/*
		$myFile = "temp.db";
		$fh = fopen($myFile, 'w') or die("can't open file");
		while(1){
		if (false !== ($bytes = socket_recv($socket, $buf, 2048, MSG_WAITALL))) {
    		echo ("Read $bytes bytes from socket_recv().Saving to file\n");
    		fwrite($fh, $buf);
		} else {
    		echo ("socket_recv() success!!\n");
    		break;
		}
	  }*/
	  
		socket_close($socket);
    fclose($fh);
?>