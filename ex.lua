#!/usr/bin/lua

local a,c

a = {}
a['b'] = 1

function dd(var)
    var['b'] = 2
end

c = a

dd(a)

for _,v in ipairs(a) do
    print(v)
end

for _,v in ipairs(c) do
    print(v)
end