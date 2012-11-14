#include <stdio.h>
#include <stdlib.h>
#include <stropts.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <sys/ioctl.h>
#include <linux/netdevice.h>
#include <arpa/inet.h>
#include <dirent.h>
#include <netinet/in.h>
#include <unistd.h>

char ip_addr[20];

int print_addresses(const int domain)
{
	int s;
	struct ifconf ifconf;
	struct ifreq ifr[50];
	int ifs;
	int i;

	s = socket(domain, SOCK_STREAM, 0);
	if (s < 0) 
	{
		perror("socket");
		return 0;
	}

	ifconf.ifc_buf = (char *) ifr;
	ifconf.ifc_len = sizeof ifr;

	if (ioctl(s, SIOCGIFCONF, &ifconf) == -1) 
	{
		perror("ioctl");
		return 0;
	}

	ifs = ifconf.ifc_len / sizeof(ifr[0]);
	
	for (i = 0; i < ifs; i++) 
	{
		char ip[INET_ADDRSTRLEN];
		struct sockaddr_in *s_in = (struct sockaddr_in *) &ifr[i].ifr_addr;

		if (!inet_ntop(domain, &s_in->sin_addr, ip, sizeof(ip))) 
		{
			perror("inet_ntop");
			return 0;
		}

		if(strcmp(ifr[i].ifr_name, "eth0") == 0)
		{
			strcpy(ip_addr, ip);
		}		
	}
	close(s);

	return 1;
}

/* Recusive check the mime type of all files */
int main(int argc, char **argv)
{
	FILE *output = NULL;
	DIR *outer_dir = NULL;
	DIR *inner_dir = NULL;
	struct dirent *ptr = NULL;
	int domains[] = { AF_INET, AF_INET6 };
	int i = 0;
	char *pch = NULL;

	print_addresses(domains[0]);

	// Open outputfile for output
	output = fopen("playlist.xml", "wt"); 

	fprintf(output, "<playlist xmlns=\"http://xspf.org/ns/0/\" version=\"1\">\n");
	fprintf(output, "<trackList>\n");

	/* Start with the outside directory */
	outer_dir = opendir("./video");

	while((ptr = readdir(outer_dir)) != NULL) 
	{   
		char pathname[512];

		sprintf(pathname,"%s", ptr->d_name);
		if(strcmp(pathname, ".") != 0 && strcmp(pathname, "..") != 0)
		{
			pch = strtok(pathname, ".");
			{
				/* Check MIME Type, if it's not NULL */
				if((inner_dir = opendir(pathname)) == NULL) 
				{   
					fprintf(output, "<track>\n");
					fprintf(output, "<title>%s</title>\n", pathname);
					fprintf(output, "<location>http://%s/video/%s.mp4</location>\n", ip_addr, pathname);
					fprintf(output, "<image>http://%s/images/%s.jpg</image>\n", ip_addr, pathname);
					fprintf(output, "</track>\n");
					fflush(output);
				}   
				else 
					closedir(inner_dir);
			}
		}
	} 
  
	fprintf(output, "</trackList>");
	fprintf(output, "</playlist>");
	closedir(outer_dir);
	fclose(output);
	return 0;
}
