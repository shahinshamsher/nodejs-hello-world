function fetchData(callback) {
    setTimeout(() => {
      callback(null, 'Data received');
    }, 1000);
  }
  
  function processData(data, callback) {
    setTimeout(() => {
      if (data === 'Data received') {
        callback(null, 'Data processed');
      } else {
        callback('Error processing data');
      }
    }, 1000);
  }
  
  function displayData(error, data) {
    if (error) {
      console.error('Error:', error);
    } else {
      console.log(data);
    }
  }
  
  fetchData((error, data) => {
    if (error) {
      displayData(error);
    } else {
      processData(data, (error, processedData) => {
        displayData(error, processedData);
      });
    }
  });
//
function fetchData() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('Data received');
      }, 1000);
    });
  }
  //promise
  function processData(data) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (data === 'Data received') {
          resolve('Data processed');
        } else {
          reject('Error processing data');
        }
      }, 1000);
    });
  }
  // async await
  async function handleData() {
    try {
      const data = await fetchData();
      const processedData = await processData(data);
      console.log(processedData);
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  handleData();
  
  