# it-girls-ankiety

## Wprowadzenie
Skrypt łączy wszystkie odpowiedzi z rożnych ankiet przeprowadzanych przez IT Girls i przetworzenie danych do formy, którą można łatwo przedstawić graficznie.
Ankiety tworzone z użyciem Google Forms, odpowiedzi zbierane w Google sheets.

## Warunki początkowe

- Ankiety utworzone w Google Forms
- Odpowiedzi z ankiet są zapisane w Google Sheets
- Konto Google z dostępem (co najmniej przeglądający) do arkuszy z odpowiedziami
- Przypisanie odpowiedzi z różnych ankiet do kategorii

## Jak przygotować pliki przed uruchomieniem skryptu?

Plik główny, w którym zebrane zostaną wszystkie odpowiedzi:

1. Utwórz nowy arkusz Google Sheets i nazwij go np. "Konsolidacja Ankiet".
- W tym arkuszu stwórz zakładkę (karta) o nazwie "Marged data". 
- W arkuszu "Marged data" ustaw następujące kolumny:
  - Form Source (nazwa źródłowej ankiety): Tutaj będzie widoczna nazwa ankiety, z której pochodzą dane.
  - N kolumn z nazwami kategorii: Tutaj będą kolumny dla każdej kategorii, do której przypisujesz pytania (np. "Marketing", "Technologia", "HR"). Liczba kolumn zależy od liczby kategorii.

2. Arkusz "Mapping sheet":
- Utwórz nowy arkusz Google Sheets i nazwij go np. "Mapowanie Ankiet".
- W tym arkuszu ustaw następujące kolumny:
  - Form Name (nazwa źródłowej ankiety): Wpisz nazwę ankiety, dla której mapujesz pytania.
  - Sheet ID (id arkusza z odpowiedziami dla danej ankiety): To unikalny identyfikator arkusza, w którym znajdują się odpowiedzi z danej ankiety. Znajdziesz go w adresie URL arkusza (pomiędzy /d/ a /).
  - Question column (nazwa kolumny - A/B/C/itd. - z arkusza odpowiedziami): Wpisz literę kolumny w arkuszu z odpowiedziami, w której znajduje się odpowiedź na dane pytanie.
  - Category column (nazwa kategorii, w której znajduje się pytanie): Wpisz nazwę kategorii, do której przypisujesz dane pytanie.
  - Question label (dodatkowa informacja o pytaniu, jeżeli w ankiecie znajduje się kilka pytań z tej samej kategorii): Opcjonalne pole, które pozwala dodać dodatkowy opis pytania, jeśli w ankiecie jest kilka pytań z tej samej kategorii.

3. Upewnij się, że pliki z odpowiedziami na ankiety są zmapowane w "Mapping sheet". Sprawdź, czy wszystkie ankiety, które chcesz połączyć, są dodane do tego arkusza z poprawnymi danymi.

Przykład:
plik główny: main.xlsx <br>
plik z odpowiedziami: answers-form-bee.xlsx <br>
plik z mapowaniem pytań do kategorii: question-mapping.xlsx <br>

## Jak korzystać z dołączonego skryptu?

1. Otwórz plik główny (np. "Konsolidacja Ankiet").
2. Z poziomu pliku głównego, z menu u góry wybierz "Rozszerzenia" --> Apps Script.
3. W oknie Kod.gs skopiuj kod umieszczony w pliku "skrypt.js". Wklej go do okna edytora.
4. Zapisz projekt na dysku (dykietka na środku ekranu).
5. Kliknij ikonę "Uruchom" (wygląda jak strzałka).
6. Jeśli Google poprosi o dostęp tej aplikacji do danych z Twoich arkuszy, przyznaj mu go. To konieczne, aby skrypt mógł pobrać dane z ankiet.
7. Po zakończeniu uruchomienia, sprawdź "Dziennik wykonywania" (po prawej stronie). Powinna pojawić się informacja w postaci "Merged x responses from n forms". Jeśli zobaczysz błąd, sprawdź dziennik, aby zidentyfikować przyczynę.
8. Dane skumulowane powinny pojawić się w głównym pliku w zakładce "Merged data". Możesz teraz łatwo przeglądać i analizować wyniki wszystkich ankiet.

## Ustawienie automatycznego uruchomienia skryptu (po otrzymaniu nowej odpowiedzi)

1. Z widoku Apps Script, najedź na menu po lewej stronie.
2. Wybierz "Reguły".
3. W dolnym prawym roku kliknij "Dodaj wyzwalacz".
4. Funkcja do uruchomienia "mergeAllForms".
5. Źródło "Z arkusza kalkulacyjnego".
6. Wybierz źródło wydarzenia - "Przy przesłaniu formularza".
7. Ustawienie powiadomień o niepowodzenia - do wyboru.
8. Kliknij "Zapisz".

## Uwagi
* Przy każdym uruchomieniu kodu, arkusz "Merged data" jest czyszczony, dane nie są dopisywane do istniejących tam danych.
* Jeżeli nie ma pytania w danej kategorii, to kolumna dla danej odpowiedzi zostanie pusta
