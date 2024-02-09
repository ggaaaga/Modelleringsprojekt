
% Konstanter %
m = 75; % Vuxen människas massa
k = 0.5; % Faktor för kraft in
r = 0.2; % Längd av pedalens hävarm
g = 9.82; % Gravitationskonstant
r2 = 0.311; % Cykelhjulets radie
h = 0.1; % Step size? från sista tut i mos: Which stepsize should be used? It can be computed by determining the stability region of the numerical method.
R = 60; % Resistans, ohm

% Ekvationer %
F = k * m*g/2; % Applied force
T = F * r; % Torque
J = m*r2/2; % Moment of Inertia
wdot = T / J; % Angular velocity

% Variabler %
w = 0; % Initial hastighet (uppdateras i loopen)
p = 0; % Initial position (uppdateras i loopen)
v = 0; % Spänning
i = 0; % Ström

t = linspace(0,100);

for t = 0:h:10

    [w,p] = eulermethod(wdot, w, p, h) % Hämta nya hastigheten och positionen från euler metoden
    %i = r2*v/R;
    plot(t,p,'o')
    hold on

end


