#check for disko
ifndef DISKO_CHECKED
export DISKO_CHECKED
$(info check for disko version >= 1.1.1)
ASK=$(shell pkg-config --atleast-version=1.1.1 disko && echo "1")
ifeq ($(ASK),)
$(error disko was not found or version is older than 1.1.1. Either adjust PKG_CONFIG_PATH or install the package)
else
export DISKO_INC=$(shell pkg-config --cflags disko)
export DISKO_LIBS=$(shell pkg-config --libs disko) $(shell pkg-config --libs-only-L disko | sed -e 's/-L/-Wl,-rpath=/g')
endif
endif


all:
	$(CXX) -g $(DISKO_INC) main.cpp $(DISKO_LIBS) -o demo
	$(CXX) -g -fPIC $(DISKO_INC) plugins/mybackend/mybackend.cpp $(DISKO_LIBS) -shared -o plugins/mybackend/libmybackendplugin.so
	$(CXX) -g -fPIC $(DISKO_INC) plugins/mycentral/mycentral.cpp $(DISKO_LIBS) -shared -o plugins/mycentral/libmycentralplugin.so

clean:
	rm -f *.o
	rm -f demo
	rm -f plugins/mybackend/libmybackendplugin.so
	rm -f plugins/mycentral/libmycentralplugin.so
	rm -f logfile

