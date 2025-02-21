package migrations

import (
	"bufio"
	"log"
	"os"
	"strconv"
	"strings"

	. "github.com/ahmetb/go-linq/v3"
	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

const filePath = "./migrations/esv.csv"

func init() {
	m.Register(func(app core.App) error {
		collection := getCollection(app)

		loadScriptureData().ForEachT(func(line []string) {
			book, _ := strconv.Atoi(line[0]);
			chapter, _ := strconv.Atoi(line[1]);
			verse, _ := strconv.Atoi(line[2]);

			record := core.NewRecord(collection);
			record.Set("Book", book);
			record.Set("Chapter", chapter);
			record.Set("Verse", verse);
			record.Set("Passage", line[3]);

			err := app.Save(record);

			if err != nil {
				log.Fatal("Failed to save record: " + record.Id);
			}
		})

		return nil
	}, func(app core.App) error {
		collection := getCollection(app)		
		records, _ := app.FindAllRecords(collection)
		
		From(records).ForEachT(func(record *core.Record) {
			app.Delete(record)
		})

		return nil
	})
}

func getCollection(app core.App) *core.Collection {
	collection, err := app.FindCollectionByNameOrId("Reference")
	if err != nil {
		return nil
	}

	return collection
}

func loadScriptureData() Query {
	file, err := os.Open(filePath)
	if err != nil {
		log.Fatal(err)
	}

	defer file.Close()

	references := [][]string{}

	scanner := bufio.NewScanner(file)	
	for scanner.Scan() {
		text := scanner.Text();
		indexOfThirdComma := getIndexOfThirdComma(text)

		reference := text[0:indexOfThirdComma]
		passage := text[indexOfThirdComma + 2:len(text) - 1]
		splitReference := strings.Split(reference, ",")

		references = append(references, []string{splitReference[0], splitReference[1], splitReference[2], passage})
	}

	return From(references)
}

func getIndexOfThirdComma(text string) int {
	var occurance = 0;

	for index, character := range text {
		if (string(character) == ",") {
			occurance++
		}

		if (occurance == 3) {
			return index
		}
	}

	return -1;
}
