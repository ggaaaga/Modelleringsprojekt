function [vnew, pnew] = eulermethod(wdot, vold, pold, h)

a = wdot;
vnew = vold + h*a;
pnew = pold + h*vnew;