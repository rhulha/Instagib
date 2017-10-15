part of instagib;

class FileCache {
  
  Map<String, File> fileCache = new Map<String, File>();
  
  File addBinary(String url) {
    return fileCache[url] = new File(true);
  }
  
  File addText(String url) {
    return fileCache[url] = new File(false);
  }
  
  File get(String url) {
    return fileCache[url];
  }

  void loadAllThenExecute( callBackFunc() ) {
    
    List<Future<HTML.Event>> futures = new List<Future<HTML.Event>>();
    
    for( String url in fileCache.keys)
    {
      File file = fileCache[url];
      if( file.loaded )
        continue;
      
      HTML.HttpRequest hr = new HTML.HttpRequest();
      if( file.binary) {
        hr.responseType = "arraybuffer";
      }
      hr.open("GET", url);
      futures.add( hr.onLoadEnd.first);
      file.hr = hr;
      hr.send();
    }
    

    // TODO: check for error !!
    Future.wait(futures).then( (List list) {
      
      for( String url in fileCache.keys)
      {
        File file = fileCache[url];
        if( file.loaded )
          continue;
        
        if( file.binary) {
          file.byteBuffer = file.hr.response;  
        } else {
          file.text = file.hr.response;
        }
        
        file.loaded = true;
        print( "loaded: $url");
      }
      
      callBackFunc();
      
    });
    
  }
  
  int check() {
    print("check");
    int notReadyCount = 0;
    for( String url in fileCache.keys )
    {
      //console.log("check: " + url + " : " + textureCache[url].ready);
      if( !fileCache[url].loaded)
      {
        notReadyCount++;
      }
    }
    return notReadyCount;
  }
  
}

class File {
  
  HTML.HttpRequest hr;
  ByteBuffer byteBuffer;
  String text;
  bool binary;
  bool loaded = false;
  
  File([this.binary=false]);
  
  Float32List asFloat32List() {
    return new Float32List.view( this.byteBuffer);
  }
  Uint16List asUint16List() {
    return new Uint16List.view( this.byteBuffer);
  }
  Int32List asInt32List() {
    return new Int32List.view( this.byteBuffer);
  }
}
