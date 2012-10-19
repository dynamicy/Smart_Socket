#include <stdio.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <netdb.h>

int main(int argc, char *argv[])
{
	struct sockaddr_in pin;
	int   mysock = 0;
	char buf[8192];

	bzero(&pin, sizeof(pin));

	pin.sin_family = AF_INET;
	pin.sin_addr.s_addr = inet_addr("140.116.226.205");
	pin.sin_port = htons(8080);

	while(1)
	{
		mysock = socket(AF_INET, SOCK_STREAM, 0);

		if (mysock == -1) 
		{
			perror("call to socket");
			exit(1);
		}

		if (connect(mysock, (void *)&pin, sizeof(pin)) == -1) 
		{
			perror("call to connect");
			exit(1);
		}

		if (send(mysock, argv[1], strlen(buf), 0) == -1) 
		{
			perror("Error in send\n");
			exit(1);
		}

		if (recv(mysock, buf, 8192, 0) == -1) 
		{
			perror("Error in receiving\n");
			exit(1);
		}  

		printf("\nResponse from server: \n\n%s\n", buf);
		break;

	}

	close(mysock);

	return 0;
}
