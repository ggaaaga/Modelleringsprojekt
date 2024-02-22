
% Konstanter %
m = 75; % Vuxen människas massa
k = 0.5; % Faktor för kraft in
r = 0.2; % Längd av pedalens hävarm
g = 9.82; % Gravitationskonstant
r2 = 0.311; % Cykelhjulets radie
h = 0.1; % Step size? från sista tut i mos: Which stepsize should be used? It can be computed by determining the stability region of the numerical method.
R = 60; % Resistans, ohm

% Ekvationer %

% Variabler %
w = 0; % Hastighet (uppdateras i loopen)
p = 0; % Position (uppdateras i loopen)
v = 0; % Spänning
i = 0; % Ström
P = 0; % effekt

t = 0:h:10;  % Time vector
positions = zeros(size(t));
velocities = zeros(size(t));
generatedPower = zeros(size(t));

for idx = 1:numel(t)

    F = k * m*g/2; % Applied force
    T = F * r; % Torque
    J = m*r2 /2; % Moment of Inertia
    wdot = T / J; % Angular velocity

    if idx > 50
        wdot = 0;
    end

    % Euler method
    [wnew, pnew] = eulermethod(wdot, w, p, h);

    % Power output
    i = T / R;
    v = r2 * wnew;
    P = i * v;

    % Update variables
    w = wnew;
    p = pnew;
    positions(idx) = p;
    velocities(idx) = w;
    generatedPower(idx) = P;
end

x = r2*sin(positions);
y = r2*cos(positions);

% Plot position
plot(x, y, 'o');
xlabel('x position');
ylabel('y position');
title('Degree of Pedal vs Time');
grid on;

figure

% Plot power
plot(t, generatedPower, '-');
xlabel('Time (s)');
ylabel('Output power (Watt)');
title('Output power vs Time');


