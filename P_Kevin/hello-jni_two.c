
#include <string.h>
#include <jni.h>
#include <stdio.h>
#include <stdlib.h>
#include <errno.h>
#include <netdb.h>
#include <unistd.h>
#include <sys/types.h>
#include <netinet/in.h>
#include <sys/socket.h>
#include <arpa/inet.h>

int port = 8080;
int temp = 1;

  struct sockaddr_in    sin;

  struct sockaddr_in    pin;

  int           mysock;

  int           tempsock;

  int           addrsize;

  char  str[100],str1[20],str2[20],str3[20];

  char  buf[100];

  int           i, len1, len2;

  float c;



jstring
Java_two_Activator_stringFromJNI( JNIEnv* env,
                                                  jobject thiz )
{


  /* 建立socket */

  mysock = socket(AF_INET, SOCK_STREAM, 0);

  if (mysock == -1) {

        perror("call to socket");

        exit(1);

  }

  /* 建立IPv4位址 */

  bzero(&sin, sizeof(sin));

  sin.sin_family = AF_INET;

  sin.sin_addr.s_addr = htonl(INADDR_ANY);

  sin.sin_port = htons(port);



  /* ?結socket */

  if (bind(mysock, (struct sockaddr *)&sin, sizeof(sin)) == -1) {

        perror("call to bind");

        exit(1);

  }

  /* 傾聽 client端 */

  if (listen(mysock, 20) == -1) {

        perror("call to listen");

        exit(1);

  }
 printf("Accepting connections ...\n");



}



jstring
Java_two_Activator_stringFromJNI1( JNIEnv* env,
                                                  jobject thiz ){


  while(1){

        /* 接受client端連結 */

        tempsock = accept(mysock, (struct sockaddr *)&pin, &addrsize);
        printf("\n收到 command:");  

        if (tempsock == -1){

                perror("call to accept");

                exit(1);

        }
 

        /* 接收client端傳來的訊息 */

        len1=recv(tempsock, str, 100, 0);

        //printf("\n收到字元數:");
        str[len1]=0;

        //printf("received from client: %s\n", str);

        /* 分析處理client端傳來的訊息 */

        if (len1 > 0) {

                strcpy(str1,strtok(str," "));
		//printf("收到request");  
                //printf("第 1 個字串為: %s\n",str1);             

                strcpy(str2,strtok(NULL," "));

                //printf("第 2 個字串為: %s\n",str2);             

                strcpy(str3,strtok(NULL," "));

                //printf("第 3 個字串為: %s\n",str3);

                c=atof(str3)*1.05;

                //sprintf(buf,"品號為 %s\n品名為 %s\n含稅價為: %.2f\n",str1, str2, c);    
		//sprintf(buf,"qqqq");              
		temp = 0;

		//有return就會離開while 迴圈
		if(str1[0]=='q')		
		  //sprintf(buf,"q");
		  return (*env)->NewStringUTF(env, &str1);
		else if(str1[0]=='p')
		  //sprintf(buf,"p");
		  return (*env)->NewStringUTF(env, &str1);
		else 
		  //sprintf(buf,"no");
		  return (*env)->NewStringUTF(env, "command error");
                
        }

        /* 將處理過的訊息傳回給client端 */

        len2 = strlen(buf);

        if (send(tempsock, buf, len2, 0) == -1) {

                perror("call to send");

                exit(1);

        }

        /* 關閉與client端的連線 */

        close(tempsock);

  }

  return 0;
//return (*env)->NewStringUTF(env, "Hello from JNI !\n");
//printf("Hello world!\n");
//return;
}






