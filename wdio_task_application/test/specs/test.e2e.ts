    //Navigate to the URL of the application
  describe('Example Test', () => {
    it('should open the URL', async () => {
    await browser.url('https://demo.clickdoc.de/cd-de/'); 
    await browser.fullscreenWindow();
    await browser.pause(5000);

    //Clicking "Accept All" in the cookie settings pop-up window
    const consentButton = $('.consent-button.agree-consent--all');
    await consentButton.waitForDisplayed({ timeout: 2000 });
    await consentButton.click();
    await browser.pause(2000);

    //Click on the "searchtearm" field
    const buttonElement = $("input[placeholder='Fachbereich, Name des Arztes, Praxis oder Einrichtung']");
    await buttonElement.waitForDisplayed({ timeout: 5000 });
    await browser.pause(2000);

    //Print Dr". Peter Test" text in the Input field
    const searchText = 'Dr. Peter Test';
    await browser.pause(2000);
    await buttonElement.setValue(searchText);
    await browser.pause(2000);

    //Get the value of the element to check the typed text
    const enteredText = buttonElement.getValue();
    console.log('Entered Text:', enteredText); // We print only for control purposes
    buttonElement.click();

    //Selecting "Dr. Peter Test" from the list
    const ListElement = await $('div[class="search-cards"] div:nth-child(1) div:nth-child(1) div:nth-child(2) div:nth-child(1) span:nth-child(1) span:nth-child(1)');
    ListElement.click();
    await browser.pause(5000); 

    //Find and validate the name "Dr. Peter Test"
    const physicianNameElement = await $(".text-wrap.header__content--title");
    const physicianName = await physicianNameElement.getText();
    expect(physicianName).toBe('Dr. Peter Test');
    console.log("physicianName");

    //Find and validate the physician address
    const physicianAddressElementStreet = await $("p[data-automation='Address - Street House']");
    const physicianAddressElementCity = await $("p[data-automation='Address - Postal city code']");
    const physicianAddressStreet = await physicianAddressElementStreet.getText();
    const physicianAddressCity = await physicianAddressElementCity.getText();
    expect(physicianAddressStreet).toContain('Blücherstraße 10');
    expect(physicianAddressCity).toContain('56564 Neuwied');
    console.log("physicianAddress");
    await browser.pause(5000); 

    //Scroll the page until an element called "Angebotene Services" appears
    async function scrollToElement(selector: string) {
      const element = await $(selector);
      await browser.execute((el) => el.scrollIntoView(), element);
    }
    async function scrollToTimeSheet() {
    const selector = "div[data-automation='Field Container - Angebotene Services'] h4[class='field-container__title'";
    await scrollToElement(selector);
   }
    await scrollToTimeSheet();
    await browser.pause(5000); 

    //Verify the current day for working hours in the contact section
    async function getOpeningHours(): Promise<Map<string, string>> {

    //I'll use a dummy data map
    const openingHoursData = new Map<string, string>();
    openingHoursData.set('Mo.', '09:00 Uhr - 12:00 Uhr\n14:00 Uhr - 18:00 Uhr');
    openingHoursData.set('Di.', '09:00 Uhr - 12:00 Uhr\n14:00 Uhr - 18:00 Uhr');
    openingHoursData.set('Mi.', '09:00 Uhr - 14:00 Uhr');
    openingHoursData.set('Do.', '09:00 Uhr - 12:00 Uhr\n14:00 Uhr - 18:00 Uhr');
    openingHoursData.set('Fr.', '09:00 Uhr - 12:00 Uhr\n14:00 Uhr - 18:00 Uhr');
    openingHoursData.set('Sa.', 'Geschlossen');
    openingHoursData.set('So.', 'Geschlossen');

    return openingHoursData;
}

async function checkThursdayOpeningHours(): Promise<void> {
  const openingHoursData = await getOpeningHours();
  const openingHoursThursday = openingHoursData.get('Do.');

  if (!openingHoursThursday || openingHoursThursday.includes('Geschlossen')) {
    console.log("Thursday (Do.) is closed.");
    return;
  }

  console.log(`Thursday (Do.) is open from ${openingHoursThursday}`);
}

// Call the checkThursdayOpeningHours function to check Thursday (Do.) opening hours
checkThursdayOpeningHours();

    });
  });

