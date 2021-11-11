# Clock

A simple clock on Internet Browser such as Google Chrome, Microsoft Edge and so on.

## Time & Location

![2021-11-02 (2)](https://user-images.githubusercontent.com/89633058/139833717-1b18efd8-0ba6-4e8f-ab5c-1057fc5e045a.png)

This clock gets UTC+9 from class "Date" on JavaScript.


This clock gets location from Geolocation API.
Due to the personal nature of the information, error messages are intentionally generated, but when actually used, the error message portion of the image will read "XX City, XX Prefecture".

## StopWatch

![2021-11-01](https://user-images.githubusercontent.com/89633058/139833720-26ec456d-a338-4f9d-a978-25039543c5ef.png)

This stopwatch is accurate to 1 millisecond.
**START button**: Starts the measurement. The function is blocked during measurement.
**STOP button**: Stop the measurement. The function is blocked when no measurement is being made.
**RESET button**: Resets the display time. The function is blocked when no measurement is being made.

## Timer

![2021-11-05 (1)](https://user-images.githubusercontent.com/89633058/140518599-7befc78c-2c5a-436c-a046-c0ab6280d3d3.png)
![2021-11-05 (2)](https://user-images.githubusercontent.com/89633058/140518607-21c8010d-de17-452e-b02c-e69da51aa54f.png)

This timer is accurate to 1 sec.
**TIMER SET button**: Set the time. The function is blocked when there is no measurement.
**STRAT button**: Starts the countdown at the set time. The function is blocked when the time is not set or countdown is not running.
**STOP button**: Stops the countdown when the time is up or in the middle of the countdown. The function will be blocked when the countdown is not running.
**RESET button**: Resets the displayed time.