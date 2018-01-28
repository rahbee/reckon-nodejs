
Reckon NodeJs Pre-Interview Coding Test 
=======================================

### Installation 

```bash
# Install
npm install

# Run
npm run start

# Tests
npm run test

```

The dev server will start on port 9999. If you wish to change the port then edit the `.env` file 

```bash
# .env
PORT=9999

```

Test 1
-----------
Visit the url http://localhost:9999 and the ouput is displayed in the browser. 

Test 2
-----------
The api end point http://localhost:9999/search shall return a response similar to the following on a successful submission of the search texts:

```bash
{
    "textToSearch": {
        "text": "String to Search"
    },
    "subText": {
        "subTexts": [
            "sub",
            "texts"
        ],
    },
    "results": {
        "candidate" : "Rahbee Alvee",
        "text": "Peter told me (actually he slurrred) that peter the pickle piper piped a pitted pickle before he petered out. Phew!",
        "results": [
            {
                "subtext": "Peter",
                "result": "1, 43, 98"
            },
            {
                "subtext": "peter",
                "result": "1, 43, 98"
            }, {
                "subtext": "Pick",
                "result": "53, 81"
            },
            {
                "subtext": "Pi",
                "result": "53, 60, 66, 74, 81"
            },
            {
                "subtext": "Z",
                "result": "<No Output>"
            }
        ] 
    },
    "submitUrl": "https://join.reckon.com/test2/submitResults",
    "submitResponse": {
        "result":"Thanks for submitting!"
    }
}

```