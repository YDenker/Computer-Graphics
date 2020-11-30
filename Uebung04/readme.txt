ReadMe:

Die einzelnen Aufgaben sind wie besprochen in Ordner abgelegt forzufinden.
In jedem Ordner ist eine eigene index.html und main.js welche die zugehörige Aufgabe zeigt.

One Branch for every Exercise:

Zusätzlich habe ich für jede Ausgabe einen eigenen branch benutzt. 
Weil ich meine "Library" im Verlauf immer upgraden werde und in allen Aufgaben verwende kann es sein, dass sie in einem späteren Zeitpunkt weit vorraus ist.
Um die Aufgabe zum Zeitpunkt der Fertigstellung mit der bis dahin ausgebauten Library anzuschauen einfach auf dem der Aufgabe zugehörigen branch wechseln.
(Ich habe den branch der Aufgabe 3 außversehen Uebung01 genannt. Aber ansonsten sollten die Uebungsnummern übereinstimmen!)


Deferred Loading Bug:

Weil ich alles in eigene Library scripts aufgeteilt habe musste ich mir einen eigenen libLoader erstellen, der die scripte alle deferred läd.
Ich habe ein bisschen recherche betrieben und festgestellt, dass async laden in meinem Fall nicht funktioniert, weil die scripte in beliebiger Reihenfolge geladen werden.
Da bei mir die Reihenfolge sehr wichtig ist lade ich sie alle deferred. Wenn aus irgend einem Grund auf der Seite nix angezeigt wird und ein reference Error passiert, einmal die Seite neu laden.
Ich habe leider noch nicht herausgefunden, warum manchmal beim Erststart die Sripte in falscher Reihenfolge geladen werden.

Yannick Denker