CC = gcc 
INCLUDE = -I /usr/include/glib-2.0/

CFLAGS = -O0 -g3 -Wall -c -static
DFLAGS = -l glib-2.0  

FileScan: main.o 
	$(CC) main.o $(DFLAGS) -o $@

main.o:
	$(CC) $(INCLUDE) $(CFLAGS) main.c

clean:
	rm *.o FileScan
