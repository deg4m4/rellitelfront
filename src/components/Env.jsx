const env = {

  'AppName': "Rellitel.ink",
  'PageLink': "http://rellitel.ink/",
  'BackEnd': "http://back.rellitel.ink/",
  'MainUrl': "http://back.rellitel.ink/",
  'SURL': "http://static.rellitel.ink/",
  'cookie': ["rellitel.ink", "app.rellitel.ink"],
  'BrwserCode': makeCode(20)
}


function makeCode(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() *
      charactersLength));
  }
  return result;
}


export default env