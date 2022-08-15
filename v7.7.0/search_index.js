var documenterSearchIndex = {"docs":
[{"location":"guidelines/","page":"Automatic merging guidelines","title":"Automatic merging guidelines","text":"CurrentModule = RegistryCI","category":"page"},{"location":"guidelines/#Automatic-merging-guidelines","page":"Automatic merging guidelines","title":"Automatic merging guidelines","text":"","category":"section"},{"location":"guidelines/","page":"Automatic merging guidelines","title":"Automatic merging guidelines","text":"These are the guidelines that a pull request must pass in order to be automatically merged.","category":"page"},{"location":"guidelines/","page":"Automatic merging guidelines","title":"Automatic merging guidelines","text":"All of those guidelines are enabled on the General registry.","category":"page"},{"location":"guidelines/","page":"Automatic merging guidelines","title":"Automatic merging guidelines","text":"For other registries, some of these guidelines can be disabled.","category":"page"},{"location":"guidelines/#New-packages","page":"Automatic merging guidelines","title":"New packages","text":"","category":"section"},{"location":"guidelines/","page":"Automatic merging guidelines","title":"Automatic merging guidelines","text":"import RegistryCI\nimport Markdown\n\nfunction guidelines_to_markdown_output(guidelines_function::Function)\n    guidelines = guidelines_function(\n        registration_type;\n        check_license = true,\n        this_is_jll_package = false,\n        this_pr_can_use_special_jll_exceptions = false,\n    )\n    filter!(x -> x[1] != :update_status, guidelines)\n    filter!(x -> !(x[1].docs isa Nothing), guidelines)\n    docs = [rstrip(x[1].docs) for x in guidelines]\n    output_string = join(string.(collect(1:length(docs)), Ref(\". \"), docs), \"\\n\")\n    output_markdown = Markdown.parse(output_string)\n    return output_markdown\nend\n\nconst guidelines_function = RegistryCI.AutoMerge.get_automerge_guidelines\nconst registration_type = RegistryCI.AutoMerge.NewPackage()\nconst output_markdown = guidelines_to_markdown_output(guidelines_function)\n\nreturn output_markdown","category":"page"},{"location":"guidelines/#New-versions-of-existing-packages","page":"Automatic merging guidelines","title":"New versions of existing packages","text":"","category":"section"},{"location":"guidelines/","page":"Automatic merging guidelines","title":"Automatic merging guidelines","text":"import RegistryCI\nimport Markdown\n\nfunction guidelines_to_markdown_output(guidelines_function::Function)\n    guidelines = guidelines_function(\n        registration_type;\n        check_license = true,\n        this_is_jll_package = false,\n        this_pr_can_use_special_jll_exceptions = false,\n    )\n    filter!(x -> x[1] != :update_status, guidelines)\n    filter!(x -> !(x[1].docs isa Nothing), guidelines)\n    docs = [rstrip(x[1].docs) for x in guidelines]\n    output_string = join(string.(collect(1:length(docs)), Ref(\". \"), docs), \"\\n\")\n    output_markdown = Markdown.parse(output_string)\n    return output_markdown\nend\n\nconst guidelines_function = RegistryCI.AutoMerge.get_automerge_guidelines\nconst registration_type = RegistryCI.AutoMerge.NewVersion()\nconst output_markdown = guidelines_to_markdown_output(guidelines_function)\n\nreturn output_markdown","category":"page"},{"location":"guidelines/#Additional-information","page":"Automatic merging guidelines","title":"Additional information","text":"","category":"section"},{"location":"guidelines/#Upper-bounded-[compat]-entries","page":"Automatic merging guidelines","title":"Upper-bounded [compat] entries","text":"","category":"section"},{"location":"guidelines/","page":"Automatic merging guidelines","title":"Automatic merging guidelines","text":"For example, the following [compat] entries meet the criteria for automatic merging:","category":"page"},{"location":"guidelines/","page":"Automatic merging guidelines","title":"Automatic merging guidelines","text":"[compat]\nPackageA = \"1\"          # [1.0.0, 2.0.0), has upper bound (good)\nPackageB = \"0.1, 0.2\"   # [0.1.0, 0.3.0), has upper bound (good)","category":"page"},{"location":"guidelines/","page":"Automatic merging guidelines","title":"Automatic merging guidelines","text":"The following [compat] entries do NOT meet the criteria for automatic merging:","category":"page"},{"location":"guidelines/","page":"Automatic merging guidelines","title":"Automatic merging guidelines","text":"[compat]\nPackageC = \">=3\"        # [3.0.0, ∞), no upper bound (bad)\nPackageD = \">=0.4, <1\"  # [0, ∞), no lower bound, no upper bound (very bad)","category":"page"},{"location":"guidelines/","page":"Automatic merging guidelines","title":"Automatic merging guidelines","text":"Please note: each [compat] entry must include only a finite number of breaking releases. Therefore, the following [compat] entries do NOT meet the criteria for automatic merging:","category":"page"},{"location":"guidelines/","page":"Automatic merging guidelines","title":"Automatic merging guidelines","text":"[compat]\nPackageE = \"0\"          # includes infinitely many breaking 0.x releases of PackageE (bad)\nPackageF = \"0.2 - 0\"    # includes infinitely many breaking 0.x releases of PackageF (bad)\nPackageG = \"0.2 - 1\"    # includes infinitely many breaking 0.x releases of PackageG (bad)","category":"page"},{"location":"guidelines/","page":"Automatic merging guidelines","title":"Automatic merging guidelines","text":"See Pkg's documentation for specification of [compat] entries in your Project.toml file.","category":"page"},{"location":"guidelines/","page":"Automatic merging guidelines","title":"Automatic merging guidelines","text":"(Note: Standard libraries are excluded for this criterion since they are bundled with Julia, and, hence, implicitly included in the [compat] entry for Julia. For the time being, JLL dependencies are also excluded for this criterion because they often have non-standard version numbering schemes; however, this may change in the future.)","category":"page"},{"location":"guidelines/","page":"Automatic merging guidelines","title":"Automatic merging guidelines","text":"You may find CompatHelper.jl and PackageCompatUI.jl helpful for maintaining up-to-date [compat] entries.","category":"page"},{"location":"guidelines/#Name-similarity-distance-check","page":"Automatic merging guidelines","title":"Name similarity distance check","text":"","category":"section"},{"location":"guidelines/","page":"Automatic merging guidelines","title":"Automatic merging guidelines","text":"These checks and tolerances are subject to change in order to improve the process.","category":"page"},{"location":"guidelines/","page":"Automatic merging guidelines","title":"Automatic merging guidelines","text":"To test yourself that a tentative package name, say MyPackage meets these checks, you can use the following code (after adding the RegistryCI package to your Julia environment):","category":"page"},{"location":"guidelines/","page":"Automatic merging guidelines","title":"Automatic merging guidelines","text":"using RegistryCI\nusing RegistryCI.AutoMerge\nall_pkg_names = AutoMerge.get_all_non_jll_package_names(path_to_registry)\nAutoMerge.meets_distance_check(\"MyPackage\", all_pkg_names)","category":"page"},{"location":"guidelines/","page":"Automatic merging guidelines","title":"Automatic merging guidelines","text":"where path_to_registry is a path to the folder containing the registry of interest. For the General Julia registry, usually path_to_registry = joinpath(DEPOT_PATH[1], \"registries\", \"General\") if you haven't changed your DEPOT_PATH. This will return a boolean, indicating whether or not your tentative package name passed the check, as well as a string, indicating what the problem is in the event the check did not pass.","category":"page"},{"location":"guidelines/","page":"Automatic merging guidelines","title":"Automatic merging guidelines","text":"Note that these automerge guidelines are deliberately conservative: it is very possible for a perfectly good name to not pass the automatic checks and require manual merging. They simply exist to provide a fast path so that manual review is not required for every new package.","category":"page"},{"location":"public/","page":"Public API","title":"Public API","text":"CurrentModule = RegistryCI","category":"page"},{"location":"public/#Public-API","page":"Public API","title":"Public API","text":"","category":"section"},{"location":"public/","page":"Public API","title":"Public API","text":"RegistryCI.test\nRegistryCI.AutoMerge.run","category":"page"},{"location":"public/#RegistryCI.test","page":"Public API","title":"RegistryCI.test","text":"test(path)\n\nRun various checks on the registry located at path. Checks for example that all files are parsable and understandable by Pkg and consistency between Registry.toml and each Package.toml.\n\nIf your registry has packages that have dependencies that are registered in other registries elsewhere, then you may provide the github urls for those registries using the registry_deps parameter.\n\n\n\n\n\n","category":"function"},{"location":"public/#RegistryCI.AutoMerge.run","page":"Public API","title":"RegistryCI.AutoMerge.run","text":"run([env, cicfg::CIService]; kwargs...)\n\nRun the RegistryCI.AutoMerge service.\n\nArguments\n\nenv: an AbstractDictionary used to read environmental variables from.  Defaults to ENV but a plain Dict can be passed to mimic an alternate environment.\nciccfg: Configuration struct describing the continuous integration (CI) environment in which AutoMerge is being run.\n\nKeyword Arguments\n\nmerge_new_packages: should AutoMerge merge registration PRs for new packages\nmerge_new_versions: should AutoMerge merge registration PRs for new versions of packages\nnew_package_waiting_period: new package waiting period, e.g Day(3).\nnew_jll_package_waiting_period: new JLL package waiting period, e.g Minute(20).\nnew_version_waiting_period: new package version waiting period, e.g Minute(10).\nnew_jll_version_waiting_period: new JLL package version waiting period, e.g Minute(10).\nregistry: the registry name you want to run AutoMerge on.\ntagbot_enabled: if tagbot is enabled.\nauthorized_authors: list of who can submit registration, e.g String[\"JuliaRegistrator\"].\nauthorized_authors_special_jll_exceptions: a list of users who can submit JLL packages (which have strict rules about allowed dependencies and are subject to new_jll_*_waiting_periods instead of new_*_waiting_periods).\nadditional_statuses: list of additional commit statuses that must pass before AutoMerge will merge a PR\nadditional_check_runs: list of additional check runs that must pass before AutoMerge will merge a PR\nerror_exit_if_automerge_not_applicable: if false, AutoMerge will not error on PRs made by non-AutoMerge-authorized users\nmaster_branch: name of master_branch, e.g you may want to specify this to \"main\" for new GitHub repositories.\nmaster_branch_is_default_branch: if master_branch specified above is the default branch.\nsuggest_onepointzero: should the AutoMerge comment include a suggestion to tag a 1.0 release for v0.x.y packages.\nregistry_deps: list of registry dependencies, e.g your packages may depend on General.\napi_url: the registry host API URL, default is \"https://api.github.com\".\ncheck_license: check package has a valid license, default is false.\npublic_registries: If a new package registration has a UUID that matches  that of a package already registered in one of these registries supplied here  (and has either a different name or different URL) then an error will be thrown.  This to prevent AutoMerge from being used for \"dependency confusion\"  attacks on those registries.\nread_only: run in read only mode, default is false.\n\nExample\n\nHere is an example of how General registry is configured\n\nusing RegistryCI\nusing Dates\n\nRegistryCI.AutoMerge.run(\n    merge_new_packages = ENV[\"MERGE_NEW_PACKAGES\"] == \"true\",\n    merge_new_versions = ENV[\"MERGE_NEW_VERSIONS\"] == \"true\",\n    new_package_waiting_period = Day(3),\n    new_jll_package_waiting_period = Minute(20),\n    new_version_waiting_period = Minute(10),\n    new_jll_version_waiting_period = Minute(10),\n    registry = \"JuliaLang/General\",\n    tagbot_enabled = true,\n    authorized_authors = String[\"JuliaRegistrator\"],\n    authorized_authors_special_jll_exceptions = String[\"jlbuild\"],\n    suggest_onepointzero = false,\n    additional_statuses = String[],\n    additional_check_runs = String[],\n    check_license = true,\n    public_registries = String[\"https://github.com/HolyLab/HolyLabRegistry\"],\n)\n\n\n\n\n\n","category":"function"},{"location":"public/","page":"Public API","title":"Public API","text":"Modules = [RegistryCI, RegistryCI.AutoMerge, RegistryCI.TagBot]\nPublic = true\nPrivate = false","category":"page"},{"location":"regexes/","page":"Regexes","title":"Regexes","text":"CurrentModule = RegistryCI","category":"page"},{"location":"regexes/#Regexes","page":"Regexes","title":"Regexes","text":"","category":"section"},{"location":"regexes/","page":"Regexes","title":"Regexes","text":"In order for AutoMerge to work, each pull request (PR) must match the following regular expressions:","category":"page"},{"location":"regexes/","page":"Regexes","title":"Regexes","text":"import RegistryCI\nimport Markdown\n\nBase.@kwdef struct TableRow\n    regex::Regex\n    regex_str::String\n    pr_field::String\n    pr_type::String\n    example::String\nend\n\nescape_pipes(str::String) = replace(str, \"|\" => \"\\\\|\")\n\nfunction table_row(; regex::Regex,\n                     pr_field::String,\n                     pr_type::String,\n                     example::String)\n    regex_str = regex |> Base.repr |> escape_pipes\n    result = TableRow(;\n            regex,\n            regex_str,\n            pr_field,\n            pr_type,\n            example,\n        )\n    return result\nend\n\nconst row_1 = table_row(;\n    regex = RegistryCI.AutoMerge.new_package_title_regex,\n    pr_field = \"PR title\",\n    pr_type = \"New packages\",\n    example = \"New package: HelloWorld v1.2.3\",\n)\n\nconst row_2 = table_row(;\n    regex = RegistryCI.AutoMerge.new_version_title_regex,\n    pr_field = \"PR title\",\n    pr_type = \"New versions\",\n    example = \"New version: HelloWorld v1.2.3\",\n)\n\nconst row_3 = table_row(;\n    regex = RegistryCI.AutoMerge.commit_regex,\n    pr_field = \"PR body\",\n    pr_type = \"All\",\n    example = \"* Commit: 012345678901234567890123456789abcdef0000\",\n)\n\nconst rows = [\n    row_1,\n    row_2,\n    row_3,\n]\n\nfor row in rows\n    regex_occurs_in_example = occursin(row.regex, row.example)\n    if !regex_occurs_in_example\n        @error(\"Regex does not occur in example\", row.regex, row.example)\n        throw(ErrorException(\"Regex `$(row.regex)` does not occur in example \\\"$(row.example)\\\"\"))\n    end\nend\n\nconst markdown_lines = String[\n    \"| Regex | Field | PR Type | Example |\",\n    \"| ----- | ----- | ------- | ------- |\",\n]\n\nfor row in rows\n    line = \"| `$(row.regex_str)` | $(row.pr_field) | $(row.pr_type) | `$(row.example)` |\"\n    push!(markdown_lines, line)\nend\n\nconst markdown_string = join(markdown_lines, \"\\n\")\nconst markdown_parsed = Markdown.parse(markdown_string)\n\nreturn markdown_parsed","category":"page"},{"location":"private-registries/","page":"Using RegistryCI on your own package registry","title":"Using RegistryCI on your own package registry","text":"CurrentModule = RegistryCI","category":"page"},{"location":"private-registries/#Using-RegistryCI-on-your-own-package-registry","page":"Using RegistryCI on your own package registry","title":"Using RegistryCI on your own package registry","text":"","category":"section"},{"location":"private-registries/","page":"Using RegistryCI on your own package registry","title":"Using RegistryCI on your own package registry","text":"In order to create and maintain a custom Julia registry, you can use LocalRegistry.jl. After you have the registry configured, you can setup CI using RegistryCI by following how it is used in the General registry.","category":"page"},{"location":"private-registries/#Basic-configuration","page":"Using RegistryCI on your own package registry","title":"Basic configuration","text":"","category":"section"},{"location":"private-registries/","page":"Using RegistryCI on your own package registry","title":"Using RegistryCI on your own package registry","text":"You will first need to copy the .ci folder in the root of the General registry to the root of your own registry. This folder contains some resources required for the RegistryCI package to work and update itself. If you do not need AutoMerge support, there is now need to copy the stopwatch.jl file in the .ci folder.","category":"page"},{"location":"private-registries/","page":"Using RegistryCI on your own package registry","title":"Using RegistryCI on your own package registry","text":"Next, you will need to copy the ci.yml and update_manifest.yml workflow files.","category":"page"},{"location":"private-registries/","page":"Using RegistryCI on your own package registry","title":"Using RegistryCI on your own package registry","text":"The ci.yml file should be modified as follows if you have packages in your registry that depend on packages in the General registry. If the packages in your registry depend on packages in other registries, they should also be added to registry_deps","category":"page"},{"location":"private-registries/","page":"Using RegistryCI on your own package registry","title":"Using RegistryCI on your own package registry","text":"- run: julia --project=.ci/ --color=yes -e 'import RegistryCI; RegistryCI.test()'\n\n+ run: julia --project=.ci/ --color=yes -e 'import RegistryCI; RegistryCI.test(registry_deps=[\"https://github.com/JuliaRegistries/General\"])'","category":"page"},{"location":"private-registries/","page":"Using RegistryCI on your own package registry","title":"Using RegistryCI on your own package registry","text":"The self-update mechanism mentioned above uses a TAGBOT_TOKEN secret in order to create a pull request with the update. This secret is a personal access token which must have the repo scope enabled. To create the repository secret follow the instructions here. Use the name TAGBOT_TOKEN and the new PAT as the value.","category":"page"},{"location":"private-registries/#TagBot-triggers","page":"Using RegistryCI on your own package registry","title":"TagBot triggers","text":"","category":"section"},{"location":"private-registries/","page":"Using RegistryCI on your own package registry","title":"Using RegistryCI on your own package registry","text":"If you want to use TagBot in the packages that you register in your registry, you need to also copy the TagBotTriggers.yml file. That workflow file also needs the TAGBOT_TOKEN secret mentioned above. In the TagBot.yml workflows of the registered packages you will also need to add the registry input as stated in the TagBot readme","category":"page"},{"location":"private-registries/","page":"Using RegistryCI on your own package registry","title":"Using RegistryCI on your own package registry","text":"with:\n  token: ${{ secrets.GITHUB_TOKEN }}\n  registry: MyOrg/MyRegistry","category":"page"},{"location":"private-registries/#AutoMerge-support","page":"Using RegistryCI on your own package registry","title":"AutoMerge support","text":"","category":"section"},{"location":"private-registries/","page":"Using RegistryCI on your own package registry","title":"Using RegistryCI on your own package registry","text":"In order to enable automerge support, you will also have to copy the automerge.yml file and change the AutoMerge invocation appropriately","category":"page"},{"location":"private-registries/","page":"Using RegistryCI on your own package registry","title":"Using RegistryCI on your own package registry","text":"using RegistryCI\nusing Dates\nRegistryCI.AutoMerge.run(\n    merge_new_packages = ENV[\"MERGE_NEW_PACKAGES\"] == \"true\",\n    merge_new_versions = ENV[\"MERGE_NEW_VERSIONS\"] == \"true\",\n    new_package_waiting_period = Day(3),\n    new_jll_package_waiting_period = Minute(20),\n    new_version_waiting_period = Minute(10),\n    new_jll_version_waiting_period = Minute(10),\n    registry = \"MyOrg/MyRegistry\",\n    tagbot_enabled = true,\n    authorized_authors = String[\"TrustedUser\"],\n    authorized_authors_special_jll_exceptions = String[\"\"],\n    suggest_onepointzero = false,\n    additional_statuses = String[],\n    additional_check_runs = String[],\n    check_license = true,\n    public_registries = String[\"https://github.com/HolyLab/HolyLabRegistry\"],\n)","category":"page"},{"location":"private-registries/","page":"Using RegistryCI on your own package registry","title":"Using RegistryCI on your own package registry","text":"Most importantly, the following should be changed","category":"page"},{"location":"private-registries/","page":"Using RegistryCI on your own package registry","title":"Using RegistryCI on your own package registry","text":"registry = \"MyOrg/MyRegistry\",\nauthorized_authors = String[\"TrustedUser\"],","category":"page"},{"location":"private-registries/","page":"Using RegistryCI on your own package registry","title":"Using RegistryCI on your own package registry","text":"You will also have to make the following change in .ci/stopwatch.jl","category":"page"},{"location":"private-registries/","page":"Using RegistryCI on your own package registry","title":"Using RegistryCI on your own package registry","text":"- registry = GitHub.Repo(\"JuliaRegistries/General\")\n+ registry = GitHub.Repo(\"MyOrg/MyRegistry\")","category":"page"},{"location":"private-registries/#Note-regarding-private-registries","page":"Using RegistryCI on your own package registry","title":"Note regarding private registries","text":"","category":"section"},{"location":"private-registries/","page":"Using RegistryCI on your own package registry","title":"Using RegistryCI on your own package registry","text":"In the case of a private registry, you might get permission errors when executing the instantiate.sh script. In that case you will also have to add the following","category":"page"},{"location":"private-registries/","page":"Using RegistryCI on your own package registry","title":"Using RegistryCI on your own package registry","text":"  - run: chmod 400 .ci/Project.toml\n  - run: chmod 400 .ci/Manifest.toml\n+ - run: chmod +x .ci/instantiate.sh","category":"page"},{"location":"private-registries/","page":"Using RegistryCI on your own package registry","title":"Using RegistryCI on your own package registry","text":"in ci.yml and also TagBotTriggers.yml and automerge.yml (in which the above appears twice) files if those features are used.","category":"page"},{"location":"","page":"Home","title":"Home","text":"CurrentModule = RegistryCI","category":"page"},{"location":"#[RegistryCI.jl](https://github.com/JuliaRegistries/RegistryCI.jl)","page":"Home","title":"RegistryCI.jl","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"RegistryCI.jl provides continuous integration (CI) tools for Julia package registries, including registry consistency testing, automatic merging (automerge) of pull requests, and automatic TagBot triggers.","category":"page"},{"location":"internals/","page":"Internals (Private)","title":"Internals (Private)","text":"CurrentModule = RegistryCI","category":"page"},{"location":"internals/#Internals","page":"Internals (Private)","title":"Internals","text":"","category":"section"},{"location":"internals/","page":"Internals (Private)","title":"Internals (Private)","text":"Modules = [RegistryCI, RegistryCI.AutoMerge, RegistryCI.TagBot]\nPublic = false\nPrivate = true","category":"page"},{"location":"internals/#RegistryCI.test","page":"Internals (Private)","title":"RegistryCI.test","text":"test(path)\n\nRun various checks on the registry located at path. Checks for example that all files are parsable and understandable by Pkg and consistency between Registry.toml and each Package.toml.\n\nIf your registry has packages that have dependencies that are registered in other registries elsewhere, then you may provide the github urls for those registries using the registry_deps parameter.\n\n\n\n\n\n","category":"function"},{"location":"internals/#RegistryCI.AutoMerge.get_all_non_jll_package_names-Tuple{AbstractString}","page":"Internals (Private)","title":"RegistryCI.AutoMerge.get_all_non_jll_package_names","text":"get_all_non_jll_package_names(registry_dir::AbstractString) -> Vector{String}\n\nGiven a path to the directory holding a registry, returns the names of all the non-JLL packages defined in that registry, along with the names of Julia's standard libraries.\n\n\n\n\n\n","category":"method"},{"location":"internals/#RegistryCI.AutoMerge.load_files_from_url_and_tree_hash-Tuple{Any, String, String, String}","page":"Internals (Private)","title":"RegistryCI.AutoMerge.load_files_from_url_and_tree_hash","text":"load_files_from_url_and_tree_hash(f, destination::String, url::String, tree_hash::String) -> Bool\n\nAttempts to clone a git repo from url into a temporary directory, runs f(dir) on that directory, then extract the files and folders from a given tree_hash, placing them in destination.\n\nReturns a boolean indicating if the cloning succeeded.\n\n\n\n\n\n","category":"method"},{"location":"internals/#RegistryCI.AutoMerge.parse_registry_pkg_info","page":"Internals (Private)","title":"RegistryCI.AutoMerge.parse_registry_pkg_info","text":"parse_registry_pkg_info(registry_path, pkg, version=nothing) -> @NamedTuple{uuid::String, repo::String, subdir::String, tree_hash::Union{Nothing, String}}\n\nSearches the registry located at registry_path for a package with name pkg. Upon finding it, it parses the associated Package.toml file and returns the UUID and repository URI, and subdir.\n\nIf version is supplied, then the associated tree_hash will be returned. Otherwise, tree_hash will be nothing.\n\n\n\n\n\n","category":"function"},{"location":"internals/#RegistryCI.AutoMerge.run-Tuple{}","page":"Internals (Private)","title":"RegistryCI.AutoMerge.run","text":"run([env, cicfg::CIService]; kwargs...)\n\nRun the RegistryCI.AutoMerge service.\n\nArguments\n\nenv: an AbstractDictionary used to read environmental variables from.  Defaults to ENV but a plain Dict can be passed to mimic an alternate environment.\nciccfg: Configuration struct describing the continuous integration (CI) environment in which AutoMerge is being run.\n\nKeyword Arguments\n\nmerge_new_packages: should AutoMerge merge registration PRs for new packages\nmerge_new_versions: should AutoMerge merge registration PRs for new versions of packages\nnew_package_waiting_period: new package waiting period, e.g Day(3).\nnew_jll_package_waiting_period: new JLL package waiting period, e.g Minute(20).\nnew_version_waiting_period: new package version waiting period, e.g Minute(10).\nnew_jll_version_waiting_period: new JLL package version waiting period, e.g Minute(10).\nregistry: the registry name you want to run AutoMerge on.\ntagbot_enabled: if tagbot is enabled.\nauthorized_authors: list of who can submit registration, e.g String[\"JuliaRegistrator\"].\nauthorized_authors_special_jll_exceptions: a list of users who can submit JLL packages (which have strict rules about allowed dependencies and are subject to new_jll_*_waiting_periods instead of new_*_waiting_periods).\nadditional_statuses: list of additional commit statuses that must pass before AutoMerge will merge a PR\nadditional_check_runs: list of additional check runs that must pass before AutoMerge will merge a PR\nerror_exit_if_automerge_not_applicable: if false, AutoMerge will not error on PRs made by non-AutoMerge-authorized users\nmaster_branch: name of master_branch, e.g you may want to specify this to \"main\" for new GitHub repositories.\nmaster_branch_is_default_branch: if master_branch specified above is the default branch.\nsuggest_onepointzero: should the AutoMerge comment include a suggestion to tag a 1.0 release for v0.x.y packages.\nregistry_deps: list of registry dependencies, e.g your packages may depend on General.\napi_url: the registry host API URL, default is \"https://api.github.com\".\ncheck_license: check package has a valid license, default is false.\npublic_registries: If a new package registration has a UUID that matches  that of a package already registered in one of these registries supplied here  (and has either a different name or different URL) then an error will be thrown.  This to prevent AutoMerge from being used for \"dependency confusion\"  attacks on those registries.\nread_only: run in read only mode, default is false.\n\nExample\n\nHere is an example of how General registry is configured\n\nusing RegistryCI\nusing Dates\n\nRegistryCI.AutoMerge.run(\n    merge_new_packages = ENV[\"MERGE_NEW_PACKAGES\"] == \"true\",\n    merge_new_versions = ENV[\"MERGE_NEW_VERSIONS\"] == \"true\",\n    new_package_waiting_period = Day(3),\n    new_jll_package_waiting_period = Minute(20),\n    new_version_waiting_period = Minute(10),\n    new_jll_version_waiting_period = Minute(10),\n    registry = \"JuliaLang/General\",\n    tagbot_enabled = true,\n    authorized_authors = String[\"JuliaRegistrator\"],\n    authorized_authors_special_jll_exceptions = String[\"jlbuild\"],\n    suggest_onepointzero = false,\n    additional_statuses = String[],\n    additional_check_runs = String[],\n    check_license = true,\n    public_registries = String[\"https://github.com/HolyLab/HolyLabRegistry\"],\n)\n\n\n\n\n\n","category":"method"}]
}
