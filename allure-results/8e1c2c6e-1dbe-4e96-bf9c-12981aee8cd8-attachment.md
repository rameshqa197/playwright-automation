# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - banner [ref=e2]:
    - heading "reCAPTCHA demo" [level=1] [ref=e3]
    - heading "\"I'm not a robot\" checkbox" [level=2] [ref=e4]
    - paragraph [ref=e5]:
      - link "↩️ Home" [ref=e6] [cursor=pointer]:
        - /url: /
  - main [ref=e7]:
    - heading "POST data" [level=2] [ref=e8]
    - generic [ref=e10]: array ( 'ex-a' => 'foo', 'ex-b' => 'bar', 'g-recaptcha-response' => '', )
    - heading "Something went wrong" [level=2] [ref=e11]
    - generic [ref=e13]: ReCaptcha\Response::__set_state(array( 'success' => false, 'errorCodes' => array ( 0 => 'missing-input-response', ), 'hostname' => NULL, 'challengeTs' => NULL, 'apkPackageName' => NULL, 'score' => NULL, 'action' => NULL, ))
    - paragraph [ref=e14]:
      - text: Check the error code reference at
      - link "https://developers.google.com/recaptcha/docs/verify#error-code-reference" [ref=e16] [cursor=pointer]:
        - /url: https://developers.google.com/recaptcha/docs/verify#error-code-reference
      - text: .
    - paragraph [ref=e17]:
      - strong [ref=e18]: "Note:"
      - text: Error code missing-input-response may mean the user just didn't complete the reCAPTCHA.
    - paragraph [ref=e19]:
      - link "⤴️ Try again" [ref=e20] [cursor=pointer]:
        - /url: /recaptcha-v2-checkbox.php
  - iframe [ref=e23]:
    - generic [ref=f13e2]:
      - generic [ref=f13e5]:
        - link "Privacy" [ref=f13e6] [cursor=pointer]:
          - /url: https://www.google.com/intl/en/policies/privacy/
        - text: "-"
        - link "Terms" [ref=f13e7] [cursor=pointer]:
          - /url: https://www.google.com/intl/en/policies/terms/
      - generic [ref=f13e8]:
        - generic [ref=f13e9]:
          - text: protected by
          - strong [ref=f13e10]: reCAPTCHA
        - generic [ref=f13e11]: "-"
```