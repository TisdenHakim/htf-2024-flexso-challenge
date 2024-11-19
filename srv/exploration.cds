using {flexso.htf as datamodel} from '../db/schema';

service ExplorationService {
    @readonly
    entity KnownGalaxies               as
        projection on DetailedGalaxiesView {
            key ID,
                name,
                distance,
                numberOfSolarSystems,
                averagePlanetsPerSolar,
                explorationReport,
                mostCommonStarType,
                mostCommonPlanetType,
                mostLikelyAlienType,
                numberOfPlanets,
                baseDrakeScore as drakeEquation,
                AlienCivilisations : Association to ContactedAlienCivilisations on AlienCivilisations.homeGalaxy.ID = $self.ID
        }
        actions {
            action decipherMessage( @mandatory message : String) returns String;
        }

    @readonly
    entity ContactedAlienCivilisations as projection on datamodel.AlienCivilisations;

    @readonly
    entity KnownPlanetTypes            as projection on datamodel.PlanetTypes;

    @readonly
    entity KnownStarTypes              as projection on datamodel.StarTypes;

    @readonly
    entity KnownAlienTypes             as projection on datamodel.AlienTypes;

    @readonly
    entity KnownAlienStatus            as projection on datamodel.AlienStatus;

    action sendCommunicationRequest( @mandatory galaxy_ID : String) returns String;
}

define view DetailedGalaxiesView as
    select from datamodel.Galaxies as Galaxies {
        key ID,
            name,
            distance,
            numberOfSolarSystems,
            averagePlanetsPerSolar,
            numberOfSolarSystems * averagePlanetsPerSolar as numberOfPlanets : Double,
            case
                when
                    $self.numberOfPlanets > 100000000000
                then
                    1
                else
                    0.66
            end                                           as baseDrakeScore  : Integer,
            explorationReport,
            mostCommonStarType,
            mostCommonPlanetType,
            mostLikelyAlienType
    };
