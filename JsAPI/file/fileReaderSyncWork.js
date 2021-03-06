

self.addEventListener('message', ({data}) => {
   const syncReader = new FileReaderSync();
   console.log(syncReader)
   const result = syncReader.readAsDataURL(data);
   self.postMessage(result)
})
