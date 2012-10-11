CC = gcc 
INCLUDE = -I /usr/local/include/gstreamer-1.0/ \
          -I /usr/include/glib-2.0/

CFLAGS = -O0 -g3 -Wall -c -static
DFLAGS = -l gstrtspserver-1.0 -l gstreamer-1.0 -l glib-2.0  

rtsp: main.o 
	$(CC) main.o $(DFLAGS) -o $@

main.o:
	$(CC) $(INCLUDE) $(CFLAGS) main.c

clean:
	rm *.o rtsp	
