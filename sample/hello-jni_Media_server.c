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

#include   <asm/ioctls.h>


int port = 10200;

  struct sockaddr_in    sin;

  struct sockaddr_in    pin;

  int           mysock;

  int           tempsock;

  int           addrsize;

  char  str[100],str1[20],str2[20],str3[20],str4[100];

  char  buf[100];

  int           i, len1, len2,len3;

  float c;


jstring
Java_one_Activator_stringFromJNI( JNIEnv* env,jobject thiz )
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

  printf("Accepting connections url.....\n");
}



jstring
Java_one_Activator_stringFromJNI1( JNIEnv* env,jobject thiz )
{

  while(1) {

        /* 接受client端連結 */

        tempsock = accept(mysock, (struct sockaddr *)&pin, &addrsize);
       
        if (tempsock == -1){
                perror("call to accept");
                exit(1);
        }

 

        /* 接收client端傳來的訊息 */

        len1=recv(tempsock, str, 100, 0);
 	printf("\n收到url : ");  
        //printf("\n收到字元數:");
        str[len1]=0;

        /* 分析處理client端傳來的訊息 */

	len2 = strlen(buf);

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
		return (*env)->NewStringUTF(env, &str1);
 

        }

        /* 將處理過的訊息傳回給client端 */

        len2 = strlen(buf);

        if (send(tempsock, buf, len2, 0) == -1) {

                perror("call to send");

                exit(1);

        }    
  }
  return 0;

}



jint
Java_one_Activator_stringFromJNI2( JNIEnv* env,jobject thiz )
{
   int a = send(tempsock, "go", 10, 0); // send mesg to server   
}


jint
Java_one_Activator_stringFromJNI3( JNIEnv* env,jobject thiz )
{
   
   u_long has = 1;                   //讓下面recv不是block的
   ioctl(tempsock, FIONBIO , &has);  //讓下面recv不是block的
   len3=recv(tempsock, str4, 100, 0);
   
   if(len3>0){
   if (str4[0]=='t'){   //表示有收到回傳      
     str4[0] = 'z';     //設初始值
     
     return 1;    
   }
  }

  else                 //表示沒有收到回傳
       return 0;

}





