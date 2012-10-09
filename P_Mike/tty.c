/////////////////////////////////////////////////
// Serial port interface program               //
/////////////////////////////////////////////////
#include <stdio.h> // standard input / output functions
#include <string.h> // string function definitions
#include <unistd.h> // UNIX standard function definitions
#include <fcntl.h> // File control definitions
#include <errno.h> // Error number definitions
#include <termios.h> // POSIX terminal control definitionss
#include <time.h>   // time calls


int open_port(char* tty_name)
{
	
	int fd; // file description for the serial port
	
	printf("Opening port %s\n",tty_name);
	fd = open(tty_name, O_RDWR);// | O_NOCTTY | O_NDELAY);

	if(fd == -1) // if open is unsucessful
	{
		perror("Unable to open port\n");
	}
	else
	{
		fcntl(fd, F_SETFL, 0);
	}

	return(fd);
}

int open_terminal()
{
	int ttyfd;
	ttyfd = open("/dev/tty", O_RDWR);// | O_NOCTTY | O_NONBLOCK); //set the user console port up
	if(ttyfd == -1) // if open is unsucessful
        {
                perror("Unable to open terminal\n");
        }
	return(ttyfd);
}

void configure_port(int fd)      // configure the port
{
	struct termios port_settings;      // structure to store the port settings in
	tcgetattr(fd, &port_settings);
	cfsetispeed(&port_settings, B115200);    // set baud rates
	cfsetospeed(&port_settings, B115200);

	//port_settings.c_cflag &= ~PARENB;    // set no parity, stop bits, data bits
	//port_settings.c_cflag &= ~CSTOPB;
	//port_settings.c_cflag &= ~CSIZE;
	port_settings.c_cflag &= ~PARENB;
	port_settings.c_cflag &= ~CSTOPB;
	port_settings.c_cflag &= ~CSIZE;
	port_settings.c_cflag |= CS8;
	//port_settings.c_cflag |= (CLOCAL | CREAD);//CS8;

	//cfmakeraw(&port_settings);
	tcsetattr(fd, TCSANOW, &port_settings);    // apply the settings to the port
	printf("Configure port success\n");
}

void configure_terminal(int ttyfd)
{
        struct termios newkey,oldkey;
        tcgetattr(ttyfd,&oldkey); // save current port settings
        // set new port settings for non-canonical input processing  //must be NOCTTY
        newkey.c_cflag = B115200 | CRTSCTS | CS8 | CLOCAL | CREAD;
        newkey.c_iflag = IGNPAR;
        newkey.c_oflag = 0;
        newkey.c_lflag = 0;       //ICANON;
        newkey.c_cc[VMIN]=1;
        newkey.c_cc[VTIME]=0;
        tcflush(ttyfd, TCIFLUSH);
        tcsetattr(ttyfd,TCSANOW,&newkey);
}

int main(int argc, char* argv[])
{
	if(argc<2)
	{
                printf("Argument is not correct\n");
		return 0;
	}
	int fd = open_port(argv[1]);
	int fd_tty = open_terminal();
	configure_port(fd);
	configure_terminal(fd_tty);
	char rec=' ',rec_tty=' ';
	while(fd!=-1 && fd_tty!=-1)
	{
		int data=read(fd,&rec,1);
		int data_tty=read(fd_tty,&rec_tty,1);
		if(data>0)
			printf("%c",rec);
		if(data_tty>0)
                        printf("%c",rec_tty);
		if(rec_tty=='q')
			break;
		rec=' ';rec_tty=' ';
	}
	close(fd);
	close(fd_tty);	
	return(0);
}

