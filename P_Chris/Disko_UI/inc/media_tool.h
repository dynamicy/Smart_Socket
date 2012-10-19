#ifndef __MEDIA_TOOL_H__
#define __MEDIA_TOOL_H__

#include <mms.h>

MMS_CREATEERROR(DB_Error);

bool getDefaultWidgets(MMSWindow *, MMSLabelWidget **, MMSLabelWidget **, MMSLabelWidget **);
int getFPS(void);
void show_fps_and_cnt(MMSLabelWidget *, int *);
void show_mpps_and_cnt(MMSLabelWidget *, int *, int);
void show_pixelformats(MMSWindow *, MMSLabelWidget *);

#endif
