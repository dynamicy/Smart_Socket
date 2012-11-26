#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <netdb.h>

const int port = 10200;
const int FAIL = -1;
const int FALSE = 0;
const int TRUE = 1;
const char *serverip = "192.168.11.15";
const char *URL = "http://192.168.11.16/playlist.xml";

int main(int argc, char **argv)
{
   struct sockaddr_in pin;
   int socket_fd = 0;
   char flag[10] = {"0x0"};
   char buffer[50] = {"0x0"};
   int finish = FALSE;

   // Initiallization
   memset(flag, 0x0, 10);
   memset(buffer, 0x0, 50);

   strcpy(buffer, URL);

   // Create server ipv4 address
   bzero(&pin, sizeof(pin));
   pin.sin_family = AF_INET;
   pin.sin_addr.s_addr = inet_addr(serverip);
   pin.sin_port = htons(port);

   //create socket
   while(1)
   {
      socket_fd = socket(AF_INET, SOCK_STREAM, 0);
      if(socket_fd == FAIL) 
      {
         perror("call to socket");
         return FAIL;
      }

      if(connect(socket_fd, (void *)&pin, sizeof(pin)) == FAIL) 
      {
         perror("call to connect");
         return FAIL;
      }

      // 
      if(finish == FALSE)
      {
         if(send(socket_fd, buffer, strlen(buffer), 0) == FAIL) 
         {
            perror("Error in send\n");
            return FAIL;
         }
         finish = TRUE;
      }

      while(1)
      {
         // int recv (int socket, void *buffer, size_t size, int flags)
         if(recv(socket_fd, flag, sizeof(flag), 0) == FAIL) 
         {
            perror("Error in receiving\n");
            return FAIL;
         }

         // receive success
         if(strcmp(flag, "g") == 0)
         {
            // echo tt if success
            if(send(socket_fd, "tt", 2, 0) == FAIL) 
            {
               perror("Error in send\n");
               return FAIL;
            }
         }
         // Initiallize
         memset(flag, 0x0, sizeof(flag));
      }
   }
   close(socket_fd);
   return 0;
}
