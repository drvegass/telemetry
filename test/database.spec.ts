import { assert } from "chai";
import MeasuresDatabase from "../src/database";

describe("measuresDb", async function() {
  const measureName = "commits";
  const measuresDb = new MeasuresDatabase();
  beforeEach(async function() {
    await measuresDb.clearMeasures();
  });
  describe("incrementMeasure", async function() {
    it("adds a new measure if it does not exist", async function() {
      const measure = await measuresDb.getMeasures();
      assert.deepEqual(measure, {});
      await measuresDb.incrementMeasure(measureName);
      const incrementedMeasure = await measuresDb.getMeasures();
      assert.deepEqual(incrementedMeasure, {[measureName]: 1});
    });
    it("increments an existing measure", async function() {
      await measuresDb.incrementMeasure(measureName);
      const measure = await measuresDb.getMeasures();
      assert.deepEqual(measure, {[measureName]: 1});
      await measuresDb.incrementMeasure(measureName);
      const incrementedMeasure = await measuresDb.getMeasures();
      assert.deepEqual(incrementedMeasure, { [measureName]: 2});
    });
  });
  describe("getMeasures", async function() {
  it("gets an empty object if measures do not exist", async function() {
    const measure = await measuresDb.getMeasures();
    assert.deepEqual(measure, {});
  });
  it("gets a single measure if it exists", async function() {
    await measuresDb.incrementMeasure(measureName);
    const measure = await measuresDb.getMeasures();
    assert.deepEqual(measure, { [measureName]: 1 });
  });
  it("gets all measures that exist", async function() {
    await measuresDb.incrementMeasure(measureName);
    await measuresDb.incrementMeasure("foo");
    const measures = await measuresDb.getMeasures();
    assert.deepEqual(measures, { [measureName]: 1, foo: 1});
  });
  });
  describe("clearMeasures", async function() {
    it("clears db containing single measure", async function() {
      await measuresDb.incrementMeasure(measureName);
      await measuresDb.clearMeasures();
      const measures = await measuresDb.getMeasures();
      assert.deepEqual(measures, {});
    });
    it("clears db containing multiple measures", async function() {
      await measuresDb.incrementMeasure(measureName);
      await measuresDb.incrementMeasure(measureName);
      await measuresDb.incrementMeasure("foo");
      await measuresDb.clearMeasures();
      const measures = await measuresDb.getMeasures();
      assert.deepEqual(measures, {});
    });
    it("clearing an empty db does not throw an error", async function() {
      const measures = await measuresDb.getMeasures();
      assert.deepEqual(measures, {});
      await measuresDb.clearMeasures();
    });
  });
});