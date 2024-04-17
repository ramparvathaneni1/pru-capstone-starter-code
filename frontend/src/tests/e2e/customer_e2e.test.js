const selenium = require("selenium-webdriver");

describe("Customer API End-To-End Tests", function () {

    let driver;

    beforeAll(async function () {
        driver = await new selenium.Builder().forBrowser("chrome").build();
        await driver.manage().window().maximize();
        await driver.get("http://localhost:3000/customers");
    });

    afterAll(async function () {
        await driver.quit();
    });

    test("should verify main heading text", async function () {
        const h1Element = await driver.findElement(selenium.By.css("h1"));
        const actualText = await h1Element.getText();
        await driver.sleep(500);
        const expectedText = "Prudential Customer Gateway";
        expect(actualText).toBe(expectedText);
    });

    let initialNumOfCustomers = 0;
    test("should verify customer list is loaded", async () => {
      const viewEditLinks = await driver.findElements(selenium.By.css("tbody a"));
      await driver.sleep(500);
      initialNumOfCustomers = viewEditLinks.length;
      expect(initialNumOfCustomers > 0).toBeTruthy();
    });

    test("should be able to add new customer", async () => {
      // Go to Add New Customer Page
      driver.navigate().to("http://localhost:3000/customers/new");
      await driver.sleep(500);
      
      // Fill in the New Customer Form and Submit
      const cisId = await driver.findElement(selenium.By.xpath("//input[@placeholder='CID ID']"));
      await cisId.sendKeys("CIS_TEST");
      await driver.sleep(500);
      const isOrg = await driver.findElement(selenium.By.xpath("//input[@name='is-org']"));
      await isOrg.click();
      await driver.sleep(500);
      const orgName = await driver.findElement(selenium.By.xpath("//input[@placeholder='Organization Name']"));
      await orgName.sendKeys("Test Org");
      await driver.sleep(500);
      const dob = await driver.findElement(selenium.By.xpath("//input[@placeholder='YYYY-MM-DD']"));
      await dob.sendKeys("1990-01-01");
      await driver.sleep(500);
      const submitBtn = await driver.findElement(selenium.By.xpath("//button[@type='submit']"));
      await submitBtn.click();
      await driver.sleep(500);

      // Verify if the Number of customers in CustomerList has increased
      const viewEditLinks = await driver.findElements(selenium.By.css("tbody a"));
      await driver.sleep(500);
      expect(initialNumOfCustomers < viewEditLinks.length).toBeTruthy();
    });

    test("should be able to delete customer", async () => {
      // Click View/Edit link for the last Customer in the list
      const viewEditLinks = await driver.findElements(selenium.By.css("tbody a"));
      const lastCustomerEditLink = viewEditLinks[viewEditLinks.length - 1];
      await lastCustomerEditLink.click();
      await driver.sleep(500);

      // Click Delete button
      const deleteBtn = await driver.findElement(selenium.By.css("button.delete-btn"));
      await deleteBtn.click();
      await driver.sleep(500);

      // Verify if the number of customers went back to the initial number.
      const viewEditLinksAfter = await driver.findElements(selenium.By.css("tbody a"));
      expect(viewEditLinksAfter.length === initialNumOfCustomers).toBeTruthy();
    });

});