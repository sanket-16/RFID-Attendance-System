import machine
import utime

# Define the GPIO pin connected to the LED
led_pin = machine.Pin('LED', machine.Pin.OUT)
# Create a loop to blink the LED
while True:
    led_pin.toggle()  # Toggle the LED state (ON/OFF)
    utime.sleep(1)    # Wait for 1 second

