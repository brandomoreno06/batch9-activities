const nightClubRegister = [
    {
        name: 'Tony',
        lastname: 'Stark',
        age: 25,
        gender: 'male'
    },
    {
        name: 'Harry',
        lastname: 'Potter',
        age: 16,
        gender: 'male'
    },
    {
        name: 'Hermione',
        lastname: 'Granger',
        age: 17,
        gender: 'female'
    },
    {
        name: 'Steve',
        lastname: 'Rogers',
        age: 62,
        gender: 'male'
    }
]


for (let i = 0; i < nightClubRegister.length; i++) {
    if (nightClubRegister[i].age > 17 && nightClubRegister[i].gender == 'male') {
      var invitation = 'Hi Mr. ' + nightClubRegister[i].name + ' ' + nightClubRegister[i].lastname + ' , you are invited.';
      console.log(invitation);
      }

      else if (nightClubRegister[i].age > 17 && nightClubRegister[i].gender == 'female') {
          var invitation = 'Hi Ms. ' + nightClubRegister[i].name + ' ' + nightClubRegister[i].lastname + ' , you are invited.';
          console.log(invitation);
      }

      else if (nightClubRegister[i].age < 18 && nightClubRegister[i].gender == 'female') {
          var invitation = 'Hi Ms. ' + nightClubRegister[i].name + ' ' + nightClubRegister[i].lastname + ' , SORRY, you are not invited.';
          console.log(invitation);
      }

      else {
      var invitation = 'Hi Mr. ' + nightClubRegister[i].name + ' ' + nightClubRegister[i].lastname + ' , SORRY, you are not invited.';
      console.log(invitation);
      
  }
}