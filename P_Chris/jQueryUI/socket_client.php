<?php
		$service_port = 5678;
		$address = '140.116.226.227';
		$socket = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);
    
		//echo "Attempting to connect to '$address' on port '$service_port'...\n";
		$result = socket_connect($socket, $address, $service_port);
		if ($result === false) {
    		die("Server didn't open\n");
		} 

    $msg = $_GET["msg"];
		$in = "HEAD / HTTP/1.1\r\n";
		$in .= "Host: www.example.com\r\n";
		$in .= "Connection: Close\r\n\r\n";
		$out = '';

		socket_write($socket, $msg, strlen($msg));
		$buf = 'This is my buffer.';
		$rec=socket_read($socket,10);
		echo $rec;	  
		socket_close($socket);
    fclose($fh);
?>