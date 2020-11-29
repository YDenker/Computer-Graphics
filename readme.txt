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
Ich habe ein bisschen recherche betrieben und festgestellt, dass async laden in meinem Fall nicht funktioniert, weil die scripte in beliebiger reihenfolge geladen werden.
Da bei mir die Reihenfolge sehr wichtig ist lade ich sie alle deferred. Trozdem passiert es mir manchmal, dass die Reihenfolge nicht beachtet wird.
Ich muss mich nochmal um eine bessere Methode umschauen. Wenn ich es bis zur nächsten Abgabe nicht geschafft habe, dann wird dieser Text hier stehen bleiben!
Wenn der Fall eintritt, dann hat bei mir immer geholfen in der main.js etwas zu ändern und zu speichern und dann nochmal neu zu laden.
Wenn in der main zuletzt gespeichert wurde klappt es komischer weise immer.
Ich hoffe ich finde vorher eine Lösung!

Yannick Denker