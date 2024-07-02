use std::fs::File;
use std::io::{BufRead, BufReader, BufWriter, Write};

fn write_copying(writer: &mut BufWriter<impl Write>, words: Vec<&str>, is_first: bool) {
    let t = words[0];
    let a = words[1];
    let x = a.chars().count() as i64;
    let s = 200_000 * x - 100_000;
    let c = if is_first { "" } else { ",\n" };
    let q = format!(
        "{c}    {{
      \"t\": \"{t}\",
      \"a\": [\"{a}\"],
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
        if line.starts_with("//") {
            continue;
        }
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
