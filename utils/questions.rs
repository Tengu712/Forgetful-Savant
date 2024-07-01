use std::fs::File;
use std::io::{BufRead, BufReader, BufWriter, Write};

fn write_copying(writer: &mut BufWriter<impl Write>, words: Vec<&str>, is_first: bool) {
    let t = words[0];
    let a = words[1];
    let x = a.chars().count() as i64;
    if x > 20 {
        println!("[ warning ] The length of correct answer must be less than 20: {t}");
        return;
    }

    let l = std::cmp::max(180, -2 * x * x / 10 + 10 * x + 210);
    if l < 0 {
        println!("[ warning ] The time limit is {l}: {t}");
        return;
    }

    let s = if x <= 7 {
        std::cmp::max(100000, 60000 * x - 140000)
    } else {
        100 * (-40 * x * x + 2400 * x - 12000)
    };
    if s < 0 {
        println!("[ warning ] The raw score is {s}: {t}");
        return;
    }

    let c = if is_first { "" } else { ",\n" };

    let q = format!(
        "{c}    {{
      \"t\": \"{t}\",
      \"a\": [\"{a}\"],
      \"l\": {l},
      \"s\": {s}
    }}"
    );
    writer.write_all(q.as_bytes()).unwrap();
}

fn main() {
    // open a questions file
    let args = std::env::args().collect::<Vec<String>>();
    let file = File::open(&args[1]).unwrap();
    let reader = BufReader::new(file);

    // create a writer
    let mut writer = BufWriter::new(File::create("./questions.json").unwrap());

    // start
    writer
        .write_all("{\n  \"questions\": [\n".as_bytes())
        .unwrap();

    // loop
    let mut is_first = true;
    for line in reader.lines() {
        let line = line.unwrap();
        let words = line.split('|').collect::<Vec<&str>>();
        if words.len() == 2 {
            write_copying(&mut writer, words, is_first);
        } else {
            println!("[ warning ] Ignore the line '{line}'.");
        }
        is_first = false;
    }

    // end
    writer.write_all("\n  ]\n}\n".as_bytes()).unwrap();
}
