CC = gcc 

CFLAGS = -O0 -g3 -Wall -c -static

FileScan: main.o 
	$(CC) main.o -o $@

main.o:
	$(CC) $(CFLAGS) main.c

clean:
	rm *.o FileScan
