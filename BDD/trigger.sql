CREATE or replace TRIGGER nsm
	BEFORE insert ON otter_worlds.`stat`
	FOR EACH row
		begin
			declare idUniv int;
			declare idUniv2 int;
			select c.universe_idUniverse
				from otter_worlds.`character` c
			where c.idCharacter = NEW.character_idCharacter
			into idUniv;
			if idUniv > 0 then
				select tc.universe_idUniverse
					from otter_worlds.`templatecategory` tc
					inner join otter_worlds.`templatestat` ts
					on tc.idTemplateCategory = ts.templateCategory_idTemplateCategory
					inner join otter_worlds.`stat` s
					on s.templateStat_idTemplateStat = ts.idTemplateStat
				where ts.idTemplateStat = NEW.templateStat_idTemplateStat
				into idUniv2;
				if idUniv != iduniv2 then
    				SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'incompatible template universe';
   				end if;
			end if;
		end;
