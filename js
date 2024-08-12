const alarms = [];

        function updateTime() {
            const now = new Date();
            const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const dateString = now.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' });
            document.getElementById('current-time').textContent = timeString;
            document.getElementById('current-date').textContent = dateString;
        }
        setInterval(updateTime, 1000);
        updateTime();

        document.getElementById('save-alarm').addEventListener('click', () => {
            const time = document.getElementById('alarm-time').value;
            const tone = document.getElementById('alarm-tone').value;
            const days = Array.from(document.querySelectorAll('.weekdays input:checked')).map(cb => cb.value);
            if (time) {
                alarms.push({ time, tone, days, active: true });
                alert(`Alarm set for ${time}`);
                showScreen('home-screen');
                displayAlarms();
            } else {
                alert('Please select a time for the alarm.');
            }
        });

        function displayAlarms() {
            const alarmList = document.getElementById('alarm-list');
            alarmList.innerHTML = '';
            alarms.forEach((alarm, index) => {
                const days = alarm.days.length ? `[${alarm.days.join(', ')}]` : '[Once]';
                alarmList.innerHTML += `
                    <li class="alarm-item">
                        ${alarm.time} (${alarm.tone}) ${days}
                        <label class="toggle-alarm">
                            <input type="checkbox" ${alarm.active ? 'checked' : ''} onchange="toggleAlarm(${index})">
                            On/Off
                        </label>
                    </li>
                `;
            });
        }

        function toggleAlarm(index) {
            alarms[index].active = !alarms[index].active;
        }

        function showScreen(screenId) {
            const screens = document.querySelectorAll('.screen');
            screens.forEach(screen => screen.classList.remove('active'));
            document.getElementById(screenId).classList.add('active');
        }

        function checkAlarms() {
            const now = new Date();
            const currentTime = now.toTimeString().slice(0, 5);
            const currentDay = now.toLocaleDateString('en', { weekday: 'short' });

            alarms.forEach(alarm => {
                if (alarm.active && alarm.time === currentTime && 
                   (alarm.days.includes(currentDay) || alarm.days.length === 0)) {
                    alert(`Alarm ringing! Time: ${alarm.time}, Tone: ${alarm.tone}`);
                    alarm.active = false;
                    displayAlarms();
                }
            });
        }
        setInterval(checkAlarms, 60000);
