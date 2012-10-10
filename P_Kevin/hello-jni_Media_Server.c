/* server.c */

#include <stdio.h>

#include <sys/socket.h>

#include <netinet/in.h>

#include <arpa/inet.h>

#include <netdb.h>

#include <stdlib.h>

#include <string.h>
#include <jni.h>


#include <errno.h>

#include <unistd.h>


int port = 10200;


int flag = 0;

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
Java_one_Activator_stringFromJNI( JNIEnv* env,
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

  printf("Accepting connections for url ........\n");
/* 接受client端連結 */
tempsock = accept(mysock, (struct sockaddr *)&pin, &addrsize);
}


jstring
Java_one_Activator_stringFromJNI1( JNIEnv* env,jobject thiz )
{




  while(1) {        

        
        //printf("\n收到url : ");  
        if (tempsock == -1){

                perror("call to accept");
                exit(1);

        }

 

        /* 接收client端傳來的訊息 */

        len1=recv(tempsock, str, 100, 0);
	printf("\n收到url : ");  
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
		
		flag = 1;
		//return (*env)->NewStringUTF(env, &str1);
 

        }

        /* 將處理過的訊息傳回給client端 */
        len2 = strlen(buf);

        if (send(tempsock, "ok", len2, 0) == -1) {

                perror("call to send");

                exit(1);

        }



        if(flag==1){
	flag = 0;
	return (*env)->NewStringUTF(env, &str1);
	}


        /* 關閉與client端的連線 */

        close(tempsock);

  }
  return 0;

//return (*env)->NewStringUTF(env, "Hello from JNI !\n");
//printf("Hello world!\n");
//return;
}


















